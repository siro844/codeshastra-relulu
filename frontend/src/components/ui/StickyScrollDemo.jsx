"use client";
import React from "react";
import { StickyScroll } from "./StickyScroll";


const content = [
  {
    title: "Give commands for your tasks",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
        <img src='https://www.thisisdmg.com/wp-content/uploads/2022/07/Ai-powered-Chatbot-2-scaled.jpg'/>
    ),
  },
  {
    title: "Control calanders using voice commands",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
       <img src='https://miro.medium.com/v2/resize:fit:800/0*pJ7uSaG2splDI-JA.png'/>
      </div>
    ),
  },
  {
    title: "Real time voice assistant",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <img src='https://img.freepik.com/premium-vector/voice-assistant-concept-artificial-intelligence-wave-microphone-control-sound-recognition_653980-38.jpg'/>
    ),
  },
  {
    title: "Real time sports field",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
        <img src='https://miro.medium.com/v2/resize:fit:800/0*pJ7uSaG2splDI-JA.png'/>
    ),
  },
];
export function StickyScrollDemo() {
  return (  
   
      <StickyScroll content={content} />
   
  );
}
