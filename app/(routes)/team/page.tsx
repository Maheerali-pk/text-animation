"use client";
import Navbar from "@/app/components/Navbar";
import { FunctionComponent, useEffect, useState } from "react";

interface WelcomeProps {}

const Team: FunctionComponent<WelcomeProps> = () => {
  return (
    <div className="w-screen h-screen flex items-center ">
      <div className="grid grid-cols-[10rem_auto_50vw] h-full">
        <div className="flex flex-col justify-between h-full">
          <Navbar></Navbar>
        </div>
      </div>
    </div>
  );
};

export default Team;
