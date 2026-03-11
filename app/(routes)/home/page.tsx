"use client";
import Navbar from "@/app/components/Navbar";
import { FunctionComponent, useEffect, useState, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import CharactersWithAnimation from "@/app/components/CharactersWithAnimation";

interface WelcomeProps {}
const TypeAnimationTime = 1000;
const TextToType = "This is an experimental project. More details to follow.";
const MsForEachCharacter = TypeAnimationTime / TextToType.length;

const characters = ["#", "$", "_", "5", "o", "a", "d"];

const svgPaths = [
  {
    width: "814",
    height: "734",
    viewBox: "0 0 814 734",
    d: "M167 407C167 348.716 182.584 294.068 209.812 247H7V7H247V195.336C305.632 128.9 391.424 87 487 87C663.732 87 807 230.268 807 407C807 434.624 803.5 461.428 796.916 487H807V727H647V684.188C599.932 711.416 545.284 727 487 727",
    stroke: "#5CAC3A",
    strokeWidth: "14",
  },
  {
    width: "814",
    height: "734",
    viewBox: "0 0 814 734",
    d: "M247 727C185.532 727 129.456 703.892 87 665.88C37.9 621.94 7 558.08 7 487C7 354.452 114.452 247 247 247C308.468 247 364.544 270.108 407 308.12V7H807V247H727V567",
    stroke: "#1B92E1",
    strokeWidth: "14",
  },
  {
    width: "724",
    height: "734",
    viewBox: "0 0 724 734",
    d: "M638.036 487H716.916V727H401.398V713.344C376.724 722.188 350.173 727 322.518 727C219.486 727 131.83 660.216 99.344 567H7V247H164.759V7H401.398V247H322.518C383.126 247 438.416 270.108 480.278 308.12V247H638.037",
    stroke: "#500072",
    strokeWidth: "14",
  },
];

const Home: FunctionComponent<WelcomeProps> = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [key, setKey] = useState(0); // Key to force re-render of motion.path

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle SVG animation cycle
  const handleAnimationComplete = () => {
    // Move to next SVG, loop back to first when done
    setCurrentSvgIndex((prev) => (prev + 1) % svgPaths.length);
    setKey((prev) => prev + 1); // Force re-render with new key
  };

  // Generate unique animation paths for each character
  const characterAnimations = useMemo(() => {
    return characters.map((_, index) => {
      // Distribute characters vertically across the height (from 15% to 85% of height)
      const baseTopPercent = 15 + (index / (characters.length - 1)) * 70;

      const x1 = (Math.random() * 40 - 20) * (index % 2 === 0 ? 1 : -1);
      const x2 = (Math.random() * 40 - 20) * (index % 2 === 0 ? -1 : 1);
      const y1 = (Math.random() * 40 - 20) * (index % 2 === 0 ? 1 : -1);
      const y2 = (Math.random() * 40 - 20) * (index % 2 === 0 ? -1 : 1);
      const z1 = Math.random() * 30 - 15;
      const z2 = Math.random() * 30 - 15;
      const rotX1 = Math.random() * 360;
      const rotX2 = Math.random() * 360;
      const rotY1 = Math.random() * 360;
      const rotY2 = Math.random() * 360;
      const rotZ1 = Math.random() * 180 - 90;
      const rotZ2 = Math.random() * 180 - 90;
      const duration = 12 + Math.random() * 6; // Much slower: 12-18 seconds

      return {
        baseTopPercent,
        x: [0, x1, x2, 0],
        y: [0, y1, y2, 0],
        z: [0, z1, z2, 0],
        rotateX: [0, rotX1, rotX2, 0],
        rotateY: [0, rotY1, rotY2, 0],
        rotateZ: [0, rotZ1, rotZ2, 0],
        duration,
      };
    });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center ">
      <div className="grid grid-cols-[10rem_auto_50vw] h-full w-full">
        <div className="flex flex-col justify-between gap-40 h-full">
          <div></div>
          <CharactersWithAnimation
            characters={characters}
            startAnimation={startAnimation}
          />
        </div>
        <div className="flex w-full h-full items-center justify-center px-3">
          <TypeAnimation
            sequence={[
              "This is an experimental project. More details to follow.",
            ]}
            wrapper="span"
            style={{ fontSize: "1rem" }}
            repeat={1}
            cursor={false}
            speed={{ type: "keyStrokeDelayInMs", value: MsForEachCharacter }}
          ></TypeAnimation>
        </div>
        <div className="flex w-full h-full items-end justify-end px-3 py-4">
          <motion.svg
            key={currentSvgIndex}
            width={svgPaths[currentSvgIndex].width}
            height={svgPaths[currentSvgIndex].height}
            viewBox={svgPaths[currentSvgIndex].viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              key={key}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 10,
                delay: key === 0 ? 2 : 0, // 2s delay only for first SVG, 0s for subsequent ones
                times: [0, 0.5, 1],
                repeat: 0, // Only play once, then cycle
                ease: "easeInOut",
              }}
              onAnimationComplete={handleAnimationComplete}
              d={svgPaths[currentSvgIndex].d}
              stroke={svgPaths[currentSvgIndex].stroke}
              strokeWidth={svgPaths[currentSvgIndex].strokeWidth}
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
