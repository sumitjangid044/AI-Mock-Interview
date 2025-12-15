"use client";

import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockInterviewQuestion = [], activeIndex, setActiveIndex }) {

    if (!mockInterviewQuestion.length) {
        return (
            <div className="p-5 border rounded-lg">
                <p className="text-gray-500">No questions available</p>
            </div>
        );
    }

    const textToSpeech = (text) => {
        if ("speechSynthesis" in window) {
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        } else {
            alert("Browser does not support text to speech");
        }
    };

    return (
        <div className="p-5 border rounded-lg max-w-2xl bg-white mt-10">

            <div className="flex flex-wrap gap-3 mb-5">
                {mockInterviewQuestion.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`px-4 py-2 rounded-full text-sm
                            ${activeIndex === index
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        Question #{index + 1}
                    </button>
                ))}
            </div>

            <div className="p-4 border rounded-lg bg-gray-50">
                {mockInterviewQuestion[activeIndex]?.question}
            </div>

            <Volume2
                className="cursor-pointer my-2"
                onClick={() => textToSpeech(mockInterviewQuestion[activeIndex]?.question)}
            />

            <div className="mt-20 p-4 bg-blue-50 border rounded-lg">
                <h2 className="flex gap-2 items-center">
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <p className="text-sm mt-2">
                    {process.env.NEXT_PUBLIC_QUESTION_NOTE}
                </p>
            </div>
        </div>
    );
}

export default QuestionSection;
