"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "./LayoutGrid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Integrated Next-Search Recommendation</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Next-Search Recommendation suggests relevant search queries based on the user's current search context, streamlining the search process by providing intuitive and helpful suggestions for the next step in information retrieval.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Multi-Device Account Support with Privacy and Security</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Multi-Device Account Support with Privacy and Security allows users to access their accounts seamlessly from multiple devices while ensuring their data remains private and secure.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Accurate Speech Recognition and Voice Profiling</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Accurate Speech Recognition to convert spoken language into text with high precision and Voice Profiling to analyze unique characteristics of individuals' voices for identification and authentication purposes.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold text-4xl text-white">Voice Command Hub</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      An intuitive voice interface, enabling seamless execution of tasks including real-time updates, API integrations, email automation, and GitHub operations
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
    "https://img.freepik.com/premium-photo/3d-purple-search-barinternet-windowcreative-business-conceptminimal-style3d-rendering_265427-1074.jpg?w=740"},  
    {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://img.freepik.com/premium-vector/purple-black-background-with-lock-words-cyber-security-it_42077-16891.jpg?w=900"  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://img.freepik.com/free-vector/abstract-equalizer-particles-waves-background_23-2148185705.jpg?t=st=1711835976~exp=1711836576~hmac=018a5eb4caadd4a30857575c2068e62832bd8b14feca7e03ce25624c673718e3",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://img.freepik.com/premium-vector/voice-assistant-concept-voice-recognition-sound-wave-imitation-voice-sound-personal-assistant_476325-1869.jpg?w=826",
  },
];
