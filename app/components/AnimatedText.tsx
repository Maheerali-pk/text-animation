// TextEaterScrambler.jsx
"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TextEaterScrambler.css"; // CSS below
import { ILine, ILineItem } from "../types/animation";
const CHSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*()[]{}<>/\\|";

function randomChar() {
  return CHSET[Math.floor(Math.random() * CHSET.length)];
}

/**
 * Single line component that handles its own animation
 */
function TextLine({
  text,
  lineItems,
  scrambleDuration = 800,
  charDelay = 4,
  startDelay = 0,
  reconstructionStartDelay = 0,
  cycle = 0,
  onReconstructionComplete,
}: {
  text: string;
  lineItems: ILineItem[];
  scrambleDuration?: number;
  charDelay?: number;
  startDelay?: number;
  reconstructionStartDelay?: number;
  cycle?: number;
  onReconstructionComplete?: () => void;
}) {
  const chars = Array.from(text);
  const [phase, setPhase] = useState<
    | "idle"
    | "scrambling"
    | "scrambled"
    | "hidden"
    | "reappearing"
    | "reconstructed"
  >("idle");
  const [displayText, setDisplayText] = useState<string>(text);
  const [coloredSegments, setColoredSegments] = useState<React.ReactNode[]>([]);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const charTimerRefs = useRef<NodeJS.Timeout[]>([]);
  const scrambledCharsRef = useRef<Map<number, string>>(new Map());
  const hiddenCharsRef = useRef<Set<number>>(new Set());
  const charsThatScrambledRef = useRef<Set<number>>(new Set());
  const charsThatDisappearedRef = useRef<Set<number>>(new Set());

  // Build a map of character index to color based on lineItems
  const charColorMap = useMemo(() => {
    const colorMap = new Map<number, string>();
    let charIndex = 0;
    lineItems.forEach((item) => {
      const itemLength = item.text.length;
      for (let i = 0; i < itemLength; i++) {
        colorMap.set(charIndex, item.color);
        charIndex++;
      }
    });
    return colorMap;
  }, [lineItems]);

  // Build display text from current state
  const buildDisplayText = (
    scrambled: Map<number, string>,
    hidden: Set<number>
  ): string => {
    return chars
      .map((originalChar, i) => {
        if (hidden.has(i)) {
          return " "; // Hidden characters become spaces
        }
        if (scrambled.has(i)) {
          return scrambled.get(i) || originalChar;
        }
        return originalChar;
      })
      .join("");
  };

  // Build colored display text with spans for each segment
  const buildColoredDisplayText = (
    scrambled: Map<number, string>,
    hidden: Set<number>
  ): React.ReactNode[] => {
    const segments: React.ReactNode[] = [];
    let currentSegment = "";
    let currentColor: string | null = null;
    let segmentStartIndex = 0;

    chars.forEach((originalChar, i) => {
      const charColor = charColorMap.get(i) || "#000000";
      let displayChar: string;

      if (hidden.has(i)) {
        displayChar = " ";
      } else if (scrambled.has(i)) {
        displayChar = scrambled.get(i) || originalChar;
      } else {
        displayChar = originalChar;
      }

      // If color changes, push current segment and start new one
      if (currentColor !== null && currentColor !== charColor) {
        segments.push(
          <span key={segmentStartIndex} style={{ color: currentColor }}>
            {currentSegment}
          </span>
        );
        currentSegment = displayChar;
        currentColor = charColor;
        segmentStartIndex = i;
      } else {
        currentSegment += displayChar;
        if (currentColor === null) {
          currentColor = charColor;
        }
      }
    });

    // Push the last segment
    if (currentSegment.length > 0 && currentColor !== null) {
      segments.push(
        <span key={segmentStartIndex} style={{ color: currentColor }}>
          {currentSegment}
        </span>
      );
    }

    return segments;
  };

  // Determine if colors should be used based on cycle
  // cycle === -1: Initial construction (non-colored)
  // Even cycles (0, 2, 4...): colors during reconstruction, no colors during destruction
  // Odd cycles (1, 3, 5...): colors during destruction, no colors during reconstruction
  const isInitialConstruction = cycle === -1;
  const shouldUseColorsInDestruction = cycle % 2 === 1;
  const shouldUseColorsInReconstruction = cycle % 2 === 0;

  // Use colored rendering based on phase and cycle
  // Include "idle" phase when colors should be used during destruction to prevent black flash
  // Initial construction (cycle === -1) is always non-colored
  const shouldUseColoredRendering =
    !isInitialConstruction &&
    (((phase === "reappearing" || phase === "reconstructed") &&
      shouldUseColorsInReconstruction) ||
      ((phase === "idle" || phase === "scrambling" || phase === "scrambled") &&
        shouldUseColorsInDestruction));

  // Update colored segments when state changes
  // This ensures colored segments are always in sync with the current state
  // Note: displayText is NOT in dependencies because the effect uses refs, not displayText directly
  // Including displayText causes flicker when destruction starts due to redundant updates
  // Use useLayoutEffect to update synchronously before paint to prevent flicker
  useLayoutEffect(() => {
    // Initial construction is always non-colored
    if (isInitialConstruction) {
      setColoredSegments([]);
      return;
    }

    // During reconstruction, always update colored segments if colors should be used
    if (phase === "reappearing" || phase === "reconstructed") {
      if (shouldUseColorsInReconstruction) {
        const segments = buildColoredDisplayText(
          scrambledCharsRef.current,
          hiddenCharsRef.current
        );
        setColoredSegments(segments);
      } else {
        setColoredSegments([]);
      }
    }
    // During destruction, update colored segments if colors should be used
    // This ensures colors are maintained even during phase transitions
    else if (phase === "scrambling" || phase === "scrambled") {
      if (shouldUseColorsInDestruction) {
        const segments = buildColoredDisplayText(
          scrambledCharsRef.current,
          hiddenCharsRef.current
        );
        setColoredSegments(segments);
      } else {
        setColoredSegments([]);
      }
    }
    // For idle phase, set colored segments if colors should be used during destruction
    else if (phase === "idle") {
      if (shouldUseColorsInDestruction) {
        const segments = buildColoredDisplayText(
          scrambledCharsRef.current,
          hiddenCharsRef.current
        );
        setColoredSegments(segments);
      } else {
        setColoredSegments([]);
      }
    }
    // For other phases, clear colored segments
    else {
      setColoredSegments([]);
    }
  }, [
    phase,
    lineItems,
    cycle,
    isInitialConstruction,
    shouldUseColorsInDestruction,
    shouldUseColorsInReconstruction,
  ]);

  useEffect(() => {
    // Reset state
    scrambledCharsRef.current.clear();
    hiddenCharsRef.current.clear();
    charsThatScrambledRef.current.clear();
    charsThatDisappearedRef.current.clear();

    // Handle initial construction (cycle === -1)
    if (isInitialConstruction) {
      // Start with all characters hidden
      const nonEmptyIndices = chars
        .map((char, i) => ({ char, i }))
        .filter(({ char }) => char.trim().length > 0)
        .map(({ i }) => i);
      const allCharsHidden = new Set(nonEmptyIndices);
      hiddenCharsRef.current = allCharsHidden;
      setColoredSegments([]);
      setPhase("reappearing");
      setDisplayText(buildDisplayText(new Map(), allCharsHidden));

      // Start initial construction animation
      const startInitialConstruction = () => {
        // Split characters: Only 15% will show as random placeholder characters first, rest appear directly
        const placeholderPercentage = 0.15;
        const placeholderCount = Math.floor(
          nonEmptyIndices.length * placeholderPercentage
        );
        const shuffledIndices = [...nonEmptyIndices].sort(
          () => Math.random() - 0.5
        );
        const charsToScrambleFirst = shuffledIndices.slice(0, placeholderCount);
        const charsToAppearDirectly = shuffledIndices.slice(placeholderCount);

        // Phase 1: Show 15% as scrambled characters
        const phase1Timer = setTimeout(() => {
          charsToScrambleFirst.forEach((charIndex) => {
            hiddenCharsRef.current.delete(charIndex);
            scrambledCharsRef.current.set(charIndex, randomChar());
          });
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          setColoredSegments([]); // Non-colored during initial construction
        }, 100);

        charTimerRefs.current.push(phase1Timer);

        // Phase 2: Change scrambled characters to original
        const phase2Timer = setTimeout(() => {
          charsToScrambleFirst.forEach((charIndex) => {
            scrambledCharsRef.current.delete(charIndex);
          });
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          setColoredSegments([]);
        }, 200);

        charTimerRefs.current.push(phase2Timer);

        // Phase 3: Show remaining 85% as original directly
        const phase3Timer = setTimeout(() => {
          charsToAppearDirectly.forEach((charIndex) => {
            hiddenCharsRef.current.delete(charIndex);
          });
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          setColoredSegments([]);
          setPhase("reconstructed");
          // Notify parent that initial construction is complete
          if (onReconstructionComplete) {
            onReconstructionComplete();
          }
        }, 260);

        charTimerRefs.current.push(phase3Timer);
      };

      // Start initial construction after a brief delay
      startTimeoutRef.current = setTimeout(() => {
        startInitialConstruction();
      }, startDelay);

      return () => {
        if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
        charTimerRefs.current.forEach((timer) => clearTimeout(timer));
        charTimerRefs.current = [];
      };
    } else {
      // Normal cycle: destruction and reconstruction
      // Set initial colored segments if colors should be used during destruction
      // This prevents the black flash before destruction starts
      // The useLayoutEffect will handle updates when phase changes
      if (shouldUseColorsInDestruction) {
        const initialSegments = buildColoredDisplayText(
          scrambledCharsRef.current,
          hiddenCharsRef.current
        );
        setColoredSegments(initialSegments);
      } else {
        setColoredSegments([]);
      }

      // Set phase and displayText after colored segments are set
      setPhase("idle");
      setDisplayText(text);

      // Clear any existing timers
      charTimerRefs.current.forEach((timer) => clearTimeout(timer));
      charTimerRefs.current = [];

      // Reappearing animation function
      const startReappearingAnimation = (calledAtTime: number) => {
        // Calculate how long to wait from now until the global reconstruction start time
        const waitTime = Math.max(0, reconstructionStartDelay - calledAtTime);

        // Filter to only non-empty characters
        const nonEmptyIndices = chars
          .map((char, i) => ({ char, i }))
          .filter(({ char }) => char.trim().length > 0)
          .map(({ i }) => i);

        // Start with all characters hidden
        const allCharsHidden = new Set(nonEmptyIndices);
        hiddenCharsRef.current = allCharsHidden;
        scrambledCharsRef.current.clear();
        setPhase("reappearing");
        setDisplayText(buildDisplayText(new Map(), allCharsHidden));

        // Split characters: Only 15% will show as random placeholder characters first, rest appear directly
        // Randomly select 15% of non-empty characters to show as scrambled placeholders
        const placeholderPercentage = 0.15; // 15% of characters
        const placeholderCount = Math.floor(
          nonEmptyIndices.length * placeholderPercentage
        );
        const shuffledIndices = [...nonEmptyIndices].sort(
          () => Math.random() - 0.5
        );
        const charsToScrambleFirst = shuffledIndices.slice(0, placeholderCount);
        const charsToAppearDirectly = shuffledIndices.slice(placeholderCount);

        // Phase 1: Show 15% as scrambled characters very early (100ms before reconstruction starts)
        const phase1EarlyDelay = -100; // Show random chars 100ms before reconstruction starts
        const phase1Timer = setTimeout(() => {
          // Batch all updates: remove from hidden and add to scrambled
          charsToScrambleFirst.forEach((charIndex) => {
            hiddenCharsRef.current.delete(charIndex);
            scrambledCharsRef.current.set(charIndex, randomChar());
          });
          // Single state update for entire line
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          // Update colored segments if needed
          if (shouldUseColorsInReconstruction) {
            const segments = buildColoredDisplayText(
              scrambledCharsRef.current,
              hiddenCharsRef.current
            );
            setColoredSegments(segments);
          } else {
            setColoredSegments([]);
          }
        }, Math.max(0, waitTime + phase1EarlyDelay)); // Ensure non-negative

        charTimerRefs.current.push(phase1Timer);

        // Phase 2: Change scrambled characters to original (after brief delay)
        const phase2Delay = 100; // Shorter delay to show scrambled text
        const phase2Timer = setTimeout(() => {
          // Batch all updates: remove from scrambled
          charsToScrambleFirst.forEach((charIndex) => {
            scrambledCharsRef.current.delete(charIndex);
          });
          // Single state update for entire line
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          // Update colored segments if needed
          if (shouldUseColorsInReconstruction) {
            const segments = buildColoredDisplayText(
              scrambledCharsRef.current,
              hiddenCharsRef.current
            );
            setColoredSegments(segments);
          } else {
            setColoredSegments([]);
          }
        }, waitTime + phase2Delay);

        charTimerRefs.current.push(phase2Timer);

        // Phase 3: Show remaining 85% as original directly
        const phase3Delay = phase2Delay + 60; // Smaller gap
        const phase3Timer = setTimeout(() => {
          // Batch all updates: remove from hidden
          charsToAppearDirectly.forEach((charIndex) => {
            hiddenCharsRef.current.delete(charIndex);
          });
          // Single state update for entire line
          const newText = buildDisplayText(
            scrambledCharsRef.current,
            hiddenCharsRef.current
          );
          setDisplayText(newText);
          // Update colored segments if needed
          if (shouldUseColorsInReconstruction) {
            const segments = buildColoredDisplayText(
              scrambledCharsRef.current,
              hiddenCharsRef.current
            );
            setColoredSegments(segments);
          } else {
            setColoredSegments([]);
          }
          setPhase("reconstructed");
          // Notify parent that reconstruction is complete
          if (onReconstructionComplete) {
            onReconstructionComplete();
          }
        }, waitTime + phase3Delay);

        charTimerRefs.current.push(phase3Timer);
      };

      // Delay the start of this line's animation
      startTimeoutRef.current = setTimeout(() => {
        // Filter to only non-empty characters (exclude spaces, tabs, etc.)
        const nonEmptyIndices = chars
          .map((char, i) => ({ char, i }))
          .filter(({ char }) => char.trim().length > 0)
          .map(({ i }) => i);

        // Determine which 70% will disappear immediately (randomly selected, no scramble, no morph)
        const charsToHide = new Set<number>();
        const totalNonEmpty = nonEmptyIndices.length;
        const hideCount = Math.floor(totalNonEmpty * 0.7);
        const indices = [...nonEmptyIndices]; // Copy array

        // Shuffle and select random indices to hide (only from non-empty characters)
        for (let i = 0; i < hideCount; i++) {
          const randomIndex = Math.floor(Math.random() * indices.length);
          charsToHide.add(indices.splice(randomIndex, 1)[0]);
        }

        hiddenCharsRef.current = charsToHide;

        // Store which characters will scramble vs disappear for reconstruction
        charsThatDisappearedRef.current = new Set(charsToHide);
        charsThatScrambledRef.current.clear();

        // Update display immediately with hidden characters
        const initialText = buildDisplayText(
          scrambledCharsRef.current,
          charsToHide
        );

        // Update state - useLayoutEffect will handle coloredSegments update synchronously
        // This ensures a single update path and prevents flicker
        setDisplayText(initialText);
        setPhase("scrambling");

        // Phase 1: Scramble remaining characters one by one (70% disappear immediately, 30% scramble character-by-character)
        // After the loop, 'indices' contains only the indices that were NOT selected to hide (and are non-empty)
        const charsToScramble = indices;

        // Ease-out function: starts fast, ends slow
        const easeOut = (t: number): number => {
          return 1 - Math.pow(1 - t, 3); // Cubic ease-out
        };

        // Calculate total duration for scrambling (based on character count)
        const totalDuration = charsToScramble.length * charDelay * 3; // Base duration

        charsToScramble.forEach((charIndex, index) => {
          // Calculate progress from 0 to 1
          const progress =
            charsToScramble.length > 1
              ? index / (charsToScramble.length - 1)
              : 0;
          // Apply ease-out function
          const easedProgress = easeOut(progress);
          // Calculate delay based on eased progress, with minimum delay for first character
          const delay = Math.max(charDelay, easedProgress * totalDuration);

          const timer = setTimeout(() => {
            // Update scrambled character
            scrambledCharsRef.current.set(charIndex, randomChar());
            // Track that this character was scrambled (for reconstruction)
            charsThatScrambledRef.current.add(charIndex);
            // Update display text
            const newText = buildDisplayText(
              scrambledCharsRef.current,
              hiddenCharsRef.current
            );
            // Update colored segments if needed during destruction (before setDisplayText to ensure they update together)
            if (shouldUseColorsInDestruction) {
              const segments = buildColoredDisplayText(
                scrambledCharsRef.current,
                hiddenCharsRef.current
              );
              // Use React's batching to update both states together
              setColoredSegments(segments);
              setDisplayText(newText);
            } else {
              setColoredSegments([]);
              setDisplayText(newText);
            }

            // If this is the last character to scramble, hide immediately
            if (index === charsToScramble.length - 1) {
              // Ensure colored segments are still set before phase change
              if (shouldUseColorsInDestruction) {
                const finalSegments = buildColoredDisplayText(
                  scrambledCharsRef.current,
                  hiddenCharsRef.current
                );
                setColoredSegments(finalSegments);
              }
              setPhase("scrambled");
              // Hide immediately after last character scrambles
              setTimeout(() => {
                setPhase("hidden");
                // Schedule reconstruction to start at the calculated global time
                const destructionCompleteTime = startDelay + delay + 10; // When this line's destruction completes
                startReappearingAnimation(destructionCompleteTime);
              }, 10); // Very short delay to show scrambled text briefly
            }
          }, delay);

          charTimerRefs.current.push(timer);
        });

        // If no characters to scramble (all hidden), hide immediately
        if (charsToScramble.length === 0) {
          setPhase("scrambled");
          phaseTimerRef.current = setTimeout(() => {
            setPhase("hidden");
            // Schedule reconstruction to start at the calculated global time
            const destructionCompleteTime = startDelay + 10; // When this line's destruction completes
            startReappearingAnimation(destructionCompleteTime);
          }, 10);
        }
      }, startDelay);
    }

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      charTimerRefs.current.forEach((timer) => clearTimeout(timer));
      charTimerRefs.current = [];
    };
  }, [
    text,
    lineItems,
    scrambleDuration,
    charDelay,
    startDelay,
    reconstructionStartDelay,
    cycle,
    onReconstructionComplete,
    isInitialConstruction,
  ]);

  return (
    <div
      className={`te-line te-${phase} ${
        phase === "hidden" ? "te-hidden" : ""
      } ${
        phase === "reappearing" || phase === "reconstructed"
          ? "te-reappearing"
          : ""
      }`}
    >
      <span className="te-text">
        {shouldUseColoredRendering ? coloredSegments : displayText}
      </span>
    </div>
  );
}

/**
 * Props:
 *  - text: string (single line) or string[] (multiple lines)
 *  - scrambleDuration: ms to show scrambled text before hiding (default 800)
 *  - lineDelay: base ms delay between each line's animation start (default 10)
 */
export default function AnimatedText({
  text,
  scrambleDuration = 800,
  lineDelay = 20,
}: {
  text: ILine[];
  scrambleDuration?: number;
  lineDelay?: number;
}) {
  const [cycle, setCycle] = useState<number>(-1); // Start with -1 for initial construction
  const completedLinesRef = useRef<Set<number>>(new Set());
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialConstructionCompletedRef = useRef<boolean>(false);

  // Extract text from ILine[] structure - combine all lineItems into a single string per line
  const lines = text.map((line) =>
    line.lineItems.map((item) => item.text).join("")
  );

  // Calculate randomized delays for cascading top-to-bottom effect
  const calculateDelay = (lineIndex: number, totalLines: number) => {
    // Base delay increases from top to bottom
    const baseDelay = lineIndex * lineDelay;
    // Add small randomization (0-5ms) to make it feel more organic
    const randomOffset = Math.random() * 5;
    // Slight increase for later lines to maintain cascading effect
    const cascadeBoost = lineIndex * 1;
    return baseDelay + randomOffset + cascadeBoost;
  };

  // Calculate when all destruction animations will complete
  // Find the maximum number of non-empty characters in any line to estimate max destruction duration
  const maxCharsInLine = Math.max(
    ...lines.map(
      (line) => Array.from(line).filter((char) => char.trim().length > 0).length
    )
  );
  const charsToScramblePerLine = Math.floor(maxCharsInLine * 0.3); // 30% scramble
  const charDelay = 4; // Match the default charDelay in TextLine
  const maxDestructionDuration = charsToScramblePerLine * charDelay * 3 + 10; // charDelay * 3 + hide delay
  const lastLineStartDelay = calculateDelay(lines.length - 1, lines.length);
  // Base reconstruction start time (after last line finishes destruction)
  const baseReconstructionStart = lastLineStartDelay + maxDestructionDuration;

  // Calculate reconstruction delay per line (top to bottom, like destruction)
  // For initial construction (cycle === -1), use simpler timing
  const calculateReconstructionDelay = (lineIndex: number) => {
    if (cycle === -1) {
      // Initial construction: simple cascading delay
      return calculateDelay(lineIndex, lines.length);
    }
    return baseReconstructionStart + calculateDelay(lineIndex, lines.length);
  };

  // Calculate when the last line will finish reconstruction
  const lastReconstructionDelay = calculateReconstructionDelay(
    lines.length - 1
  );
  const reconstructionDuration = 400; // Approximate duration for reconstruction phases
  const totalCycleDuration = lastReconstructionDelay + reconstructionDuration;

  // Handle reconstruction completion for a line
  const handleReconstructionComplete = useCallback(
    (lineIndex: number) => {
      completedLinesRef.current.add(lineIndex);

      // Check if all lines have completed reconstruction
      if (completedLinesRef.current.size === lines.length) {
        // Clear the completed set
        completedLinesRef.current.clear();

        // Clear any existing restart timer
        if (restartTimerRef.current) {
          clearTimeout(restartTimerRef.current);
          restartTimerRef.current = null;
        }

        // If this was initial construction (cycle === -1), transition to cycle 0
        if (cycle === -1 && !initialConstructionCompletedRef.current) {
          initialConstructionCompletedRef.current = true;
          restartTimerRef.current = setTimeout(() => {
            // Start cycle 0 (first destruction/reconstruction cycle)
            setCycle(0);
            restartTimerRef.current = null;
          }, 600); // Brief pause before starting destruction
        } else {
          // Normal cycle: increment to next cycle
          restartTimerRef.current = setTimeout(() => {
            setCycle((prev) => prev + 1);
            restartTimerRef.current = null;
          }, 600); // Brief pause before restarting
        }
      }
    },
    [lines.length, cycle]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="te-container" aria-hidden="false" role="img">
      {text.map((line, lineIndex) => (
        <TextLine
          key={`${cycle}-${lineIndex}`} // Force remount when cycle changes to clear all state
          text={lines[lineIndex]}
          lineItems={line.lineItems}
          scrambleDuration={scrambleDuration}
          startDelay={calculateDelay(lineIndex, lines.length)}
          reconstructionStartDelay={calculateReconstructionDelay(lineIndex)}
          cycle={cycle}
          onReconstructionComplete={() =>
            handleReconstructionComplete(lineIndex)
          }
        />
      ))}
    </div>
  );
}
