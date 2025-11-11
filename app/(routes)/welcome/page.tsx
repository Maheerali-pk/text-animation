"use client";
import { FunctionComponent, useEffect, useState } from "react";
import AnimatedFrog from "@/app/components/AnimatedFrog";
import { redirect } from "next/navigation";

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  const [clickedOnce, setClickedOnce] = useState(false);
  useEffect(() => {
    if (clickedOnce) {
      setTimeout(() => {
        redirect("/home");
      }, 750 * 4);
    }
  }, [clickedOnce]);

  if (!clickedOnce) {
    return (
      <div
        onClick={() => setClickedOnce(true)}
        className="w-screen h-screen"
      ></div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <AnimatedFrog />
    </div>
  );
};

export default Welcome;
