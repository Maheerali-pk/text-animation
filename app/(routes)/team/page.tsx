"use client";
import Navbar from "@/app/components/Navbar";
import { FunctionComponent, useEffect, useState, useMemo } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import CharactersWithAnimation from "@/app/components/CharactersWithAnimation";

interface TeamProps {}

const TypeAnimationTime = 1000;
const TextToType = "Meet our team. We are passionate creators and innovators.";
const MsForEachCharacter = TypeAnimationTime / TextToType.length;

const characters = ["#", "$", "_", "5", "o", "a", "d"];

const Team: FunctionComponent<TeamProps> = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
            width="814"
            height="734"
            viewBox="0 0 814 734"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 8.5,
                delay: 2,
                times: [0, 0.5, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }}
              d="M167 407C167 348.716 182.584 294.068 209.812 247H7V7H247V195.336C305.632 128.9 391.424 87 487 87C663.732 87 807 230.268 807 407C807 434.624 803.5 461.428 796.916 487H807V727H647V684.188C599.932 711.416 545.284 727 487 727"
              stroke="#5CAC3A"
              strokeWidth="14"
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
};

export default Team;
