"use client";
import { TypeEffect } from "./TypeEffect";
export function TypeEffectDemo() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "Virtual",
    },
    {
      text: "Voice",
    },
    {
      text: "Assistant",
    },
    {
      text: "Octave",
      className: "text-blue-500 dark:text-purple-900",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className=" text-neutral-200 text-xs sm:text-base  ">
        Convinience at your fingertips
      </p>
      <TypeEffect words={words} />
    
    </div>
  );
}
