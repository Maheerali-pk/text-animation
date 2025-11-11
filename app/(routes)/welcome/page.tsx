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
      }, 750 * 6);
    }
  }, [clickedOnce]);
  useEffect(() => {
    if (!clickedOnce) {
      setTimeout(() => {
        setClickedOnce(true);
      }, 600);
    }
  }, []);

  if (!clickedOnce) {
    return <div className="w-screen h-screen"></div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="frog-container">
        <AnimatedFrog />
      </div>
    </div>
  );
};

export default Welcome;
