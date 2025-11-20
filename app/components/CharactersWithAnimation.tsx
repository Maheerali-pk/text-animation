import { motion } from "framer-motion";
import { useMemo } from "react";
interface CharactersWithAnimationProps {
  characters: string[];
  startAnimation: boolean;
}

const CharactersWithAnimation: React.FC<CharactersWithAnimationProps> = ({
  characters,
  startAnimation,
}) => {
  const characterAnimations = useMemo(() => {
    return characters.map((_, index) => {
      // Randomly distribute characters vertically (from 10% to 90% of height)
      const baseTopPercent = 10 + Math.random() * 80;
      // Randomly distribute characters horizontally (from 10% to 90% of width)
      const baseLeftPercent = 10 + Math.random() * 80;

      // Completely random movement paths without symmetry patterns
      const x1 = (Math.random() - 0.5) * 80; // -40 to 40
      const x2 = (Math.random() - 0.5) * 80;
      const x3 = (Math.random() - 0.5) * 80;
      const y1 = (Math.random() - 0.5) * 80;
      const y2 = (Math.random() - 0.5) * 80;
      const y3 = (Math.random() - 0.5) * 80;
      const z1 = (Math.random() - 0.5) * 60; // -30 to 30
      const z2 = (Math.random() - 0.5) * 60;
      const z3 = (Math.random() - 0.5) * 60;

      // Random rotations
      const rotX1 = Math.random() * 360;
      const rotX2 = Math.random() * 360;
      const rotX3 = Math.random() * 360;
      const rotY1 = Math.random() * 360;
      const rotY2 = Math.random() * 360;
      const rotY3 = Math.random() * 360;
      const rotZ1 = (Math.random() - 0.5) * 360;
      const rotZ2 = (Math.random() - 0.5) * 360;
      const rotZ3 = (Math.random() - 0.5) * 360;

      // Random duration for each character
      const duration = 10 + Math.random() * 10; // 10-20 seconds

      return {
        baseTopPercent,
        baseLeftPercent,
        x: [0, x1, x2, x3, 0],
        y: [0, y1, y2, y3, 0],
        z: [0, z1, z2, z3, 0],
        rotateX: [0, rotX1, rotX2, rotX3, 0],
        rotateY: [0, rotY1, rotY2, rotY3, 0],
        rotateZ: [0, rotZ1, rotZ2, rotZ3, 0],
        duration,
      };
    });
  }, []);
  return (
    <div
      className="flex flex-col gap-4 relative h-full items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      {characterAnimations.map((char, index) => {
        const anim = characterAnimations[index];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 0, y: 0, z: 0 }}
            animate={
              startAnimation
                ? {
                    opacity: 1,
                    x: anim.x,
                    y: anim.y,
                    z: anim.z,
                    rotateX: anim.rotateX,
                    rotateY: anim.rotateY,
                    rotateZ: anim.rotateZ,
                  }
                : { opacity: 0, x: 0, y: 0, z: 0 }
            }
            transition={{
              opacity: {
                duration: 0.5,
                delay: index * 0.2 + 1.4,
              },
              x: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              y: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              z: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              rotateX: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              rotateY: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              rotateZ: {
                duration: anim.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              },
            }}
            style={{
              fontSize: "40px",
              color: "#CBCFD8",
              position: "absolute",
              transformStyle: "preserve-3d",
              left: `${anim.baseLeftPercent}%`,
              top: `${anim.baseTopPercent}%`,
              marginLeft: "-20px",
              marginTop: "-20px",
            }}
          >
            {characters[index]}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CharactersWithAnimation;
