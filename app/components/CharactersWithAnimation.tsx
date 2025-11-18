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
                delay: index * 0.2,
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
              left: "50%",
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
