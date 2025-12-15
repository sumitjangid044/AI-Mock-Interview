"use client";

import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

function RecordAnswerSection({ mockInterviewQuestion, activeIndex, interviewData }) {

    const { user } = useUser(); // ✅ FIXED

    const [userAnswer, setUserAnswer] = useState("");
    const [loadingFeedback, setLoadingFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    /* ---------------- SPEECH → TEXT ---------------- */
    useEffect(() => {
        if (!results.length) return;

        const latest = results[results.length - 1];
        if (latest?.transcript) {
            setUserAnswer(prev => prev + " " + latest.transcript);
        }
    }, [results]);

    /* ---------------- SAFE JSON PARSER ---------------- */
    const safeJsonParse = (text) => {
        try {
            const cleanText = text.replace(/```json|```/g, "").trim();
            return JSON.parse(cleanText);
        } catch {
            return null;
        }
    };

    /* ---------------- FEEDBACK AUTO TRIGGER ---------------- */
    useEffect(() => {
        if (!isRecording && userAnswer.trim().length > 10) {
            generateFeedback(
                mockInterviewQuestion[activeIndex]?.question,
                userAnswer
            );
        }
    }, [isRecording]);

    /* ---------------- FEEDBACK + SAVE ---------------- */
    const generateFeedback = async (question, answer) => {
        try {
            setLoadingFeedback(true);

            // 1️⃣ Get feedback
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, answer }),
            });

            const data = await res.json();
            if (!data.success) throw new Error();

            const JsonFeedbackResp = safeJsonParse(
                JSON.stringify(data.data)
            );

            if (!JsonFeedbackResp) {
                toast("Feedback parse failed");
                return;
            }

            setFeedback(JsonFeedbackResp);
            toast("Feedback generated ✅");

            // 2️⃣ Save answer in DB (API route)
            await fetch("/api/user-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mockIdRef: interviewData?.mockId,
                    question,
                    correctAns: mockInterviewQuestion[activeIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp.feedback,
                    rating: JsonFeedbackResp.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-YYYY"),
                }),
            });

            toast("User answer saved successfully ✅");

        } catch (err) {
            console.error(err);
            toast("Feedback failed ❌");
        } finally {
            setLoadingFeedback(false);
        }
    };

    /* ---------------- RECORD BUTTON ---------------- */
    const SaveUserAnswer = () => {
        if (isRecording) {
            stopSpeechToText();

            if (userAnswer.trim().length < 10) {
                toast.warning("Your answer is too short. Can you record it again?");
                return;
            }

            toast.success("User Answer recorded successfully");
        } else {
            setUserAnswer("");
            startSpeechToText();
            setResults([]);
        }
        setResults([]);
    };

    /* ---------------- UI (UNCHANGED) ---------------- */
    return (
        <div className="flex items-center justify-center flex-col">

            <div className="relative w-[450px] h-[250px] bg-black rounded-xl flex items-center justify-center mt-10">
                <Image src="/webcam.png" alt="webcam" width={200} height={200} className="absolute" />
                <Webcam mirrored style={{ height: 300, width: "100%", zIndex: 10 }} />
            </div>

            <Button
                variant="outline"
                className="my-5"
                onClick={SaveUserAnswer}
                disabled={loadingFeedback}
            >
                {isRecording ? (
                    <span className="text-red-600 flex gap-2">
                        <Mic /> Stop Recording...
                    </span>
                ) : (
                    "Record Answer"
                )}
            </Button>

            

        </div>
    );
}

export default RecordAnswerSection;
