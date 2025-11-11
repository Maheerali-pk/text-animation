"use client";
import { FunctionComponent, useEffect, useState } from "react";

interface WelcomeProps {}

const Welcome: FunctionComponent<WelcomeProps> = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Home</h1>
    </div>
  );
};

export default Welcome;
