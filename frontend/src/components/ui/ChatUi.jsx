"use client";
import { useState, useRef, useEffect } from "react";
// import { Send } from "react-feather";
import LoadingDots from "./LoadingDots";
import React from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';


export default function ChatUi() {

    // recorder

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: false,
        useLegacyResults: false,
        onStoppedSpeaking: true
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;


    const [message, setMessage] = useState("");
    // console.log( "  This is the result ::"+results);
    // console.log( "This is the "+message);

    const [history, setHistory] = useState([

    ]);
    const isInitialRender = useRef(true);

    console.log(history);
    useEffect(() => {
        if (results.length > 0)
            setMessage(results[results.length - 1].transcript)
        else if (results.length === 0)
            setMessage(results[0]?.transcript)
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        setHistory((oldHistory) => [
            ...oldHistory,
            {
                role: "user",
                content: results.length === 0 ? results[0]?.transcript : results.length > 0 ? results[results.length - 1].transcript  : null

            }
        ]);

// setMessage("")

    }, [results])


    const lastMessageRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const my_arr = [];

        const handleClick = async () => {
            if (!isRecording) {
                await startSpeechToText();
            }
        
            // // Check if the speech-to-text service is not being used
            // if (!isRecording && message!=="") {
            //     try {
            //         console.log("API call")
            //         const response = await axios.post(
            //             'http://localhost:5000/generate', {text: message });
            //         console.log(response.data);
            //     } catch (error) {
            //         console.error('HTTP error', error);
            //     }
            // }
        };
   
        useEffect(() => {
            const sendRequest = async () => {
                if (!isRecording && message !== "") {
                    try {
                        console.log("API call")
                        const response = await axios.post(
                            'http://localhost:5000/generate', { text: message });
                        console.log(response.data);
                        const recommend='';
                        if (history.length%10==0)
                        {
                            const recommend = await axios.post(
                            'http://localhost:5000/recommend', { text: message });
                        }
                        my_arr.push(r.output);
                        setHistory((oldHistory) => [
                         ...oldHistory,
                        {
                            role: "assistant",
                            content: r.output,
                        },
                        ]);
                        setLoading(false);
                    } catch (error) {
                        console.error('HTTP error', error);
                    }
                }
            };
    
            sendRequest();
        }, [isRecording, message]);




    const formatPageName = (url) => {
        const pageName = url.split("/").pop();

        if (pageName) {
            const formattedName = pageName.split("-").join(" ");
            return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
        }
    };
    useEffect(() => {
        if (results.length > 0)
            setMessage(results[results.length - 1].transcript)
    }, [results])

    useEffect(() => {

        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history]);

    return (
        <main className="h-screen bg-white p-6 flex flex-col">
            <div>

            </div>
            <div className="flex flex-col gap-8 w-full items-center flex-grow max-h-full">
                <h1 className=" text-4xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500">
                    Customer Care Chat
                </h1>
                <form
                    className="rounded-2xl border-purple-700 border-opacity-5  border lg:w-3/4 flex-grow flex flex-col bg-[url('/images/bg.png')] bg-cover max-h-full overflow-clip"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleClick();
                    }}
                >
                    <div className="overflow-y-scroll flex flex-col gap-5 p-10 h-full">
                        {history.map((message, idx) => {
                            const isLastMessage = idx === history.length - 1;
                            switch (message.role) {
                                case "assistant":
                                    return (
                                        <div
                                            ref={isLastMessage ? lastMessageRef : null}
                                            key={idx}
                                            className="flex gap-2"
                                        >
                                            <img
                                                src="images/assistant-avatar.png"
                                                className="h-12 w-12 rounded-full"
                                            />
                                            <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]">
                                                <p className="text-sm font-medium text-violet-500 mb-2">
                                                    AI assistant
                                                </p>
                                                {message.content}
                                                {message.links && (
                                                    <div className="mt-4 flex flex-col gap-2">
                                                        <p className="text-sm font-medium text-slate-500">
                                                            Sources:
                                                        </p>
                                                        {message.links?.map((link) => {
                                                            return (
                                                                <a
                                                                    href={link}
                                                                    key={link}
                                                                    className="block w-fit px-2 py-1 text-sm  text-violet-700 bg-violet-100 rounded"
                                                                >
                                                                    {formatPageName(link)}
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                case "user":
                                    return (
                                        <div
                                            className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tl-xl text-black p-6 self-end shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                                            key={idx}
                                            ref={isLastMessage ? lastMessageRef : null}
                                        >
                                            <p className="text-sm font-medium text-violet-500 mb-2">
                                                You
                                            </p>
                                            {message.content}
                                        </div>
                                    );
                            }
                        })}
                        {loading && (
                            <div ref={lastMessageRef} className="flex gap-2">
                                <img
                                    src="images/assistant-avatar.png"
                                    className="h-12 w-12 rounded-full"
                                />
                                <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]">
                                    <p className="text-sm font-medium text-violet-500 mb-4">
                                        AI assistant
                                    </p>
                                    <LoadingDots />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex sticky bottom-0 w-full px-6 pb-6 h-24">
                        <div className="w-full relative">
                            <textarea
                                aria-label="chat input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message"
                                className="w-full h-full resize-none rounded-full border border-slate-900/10 bg-white pl-6 pr-24 py-[25px] text-base placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        handleClick();
                                        e.preventDefault();
                                    }
                                }}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick();
                                }}
                                className="flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm  bg-violet-600 font-semibold text-white hover:bg-violet-700 active:bg-violet-800 absolute right-2 bottom-2 disabled:bg-violet-100 disabled:text-violet-400"
                                type="submit"
                                aria-label="Send"
                            // disabled={!message || loading}
                            >

<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
</svg>
                            </button>
                        </div>
                    </div>
                </form>


            </div>
            {/* <div>
                <h1>Recording: {isRecording.toString()}</h1>
                <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <ul>
                    {results.map((result) => (
                        <li key={result.timestamp}>{result.transcript}</li>
                    ))}
                    {interimResult && <li>{interimResult}</li>}
                </ul>
            </div> */}
        </main>
    );
}
