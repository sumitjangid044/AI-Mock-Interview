"use client";

import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInterview();
    }, []);

    const safeParseQuestions = (raw) => {
        // already array
        if (Array.isArray(raw)) return raw;

        // plain string → convert to single question
        if (typeof raw === "string") {
            return [{ question: raw }];
        }

        // object → wrap
        if (typeof raw === "object") {
            return [raw];
        }

        return [];
    };

    const fetchInterview = async () => {
        try {
            const resp = await fetch(`/api/interview/${params.interviewId}`);

            if (!resp.ok) {
                console.error("Interview API failed");
                setLoading(false);
                return;
            }

            const res = await resp.json();

            const interview = res?.data;
            if (!interview || !interview.jsonMockResp) {
                console.error("Invalid interview data");
                setLoading(false);
                return;
            }

            const questions = extractQuestions(interview.jsonMockResp);
            setMockInterviewQuestion(questions);
            setInterviewData(interview);

        } catch (err) {
            console.error("Fetch error ❌", err);
        } finally {
            setLoading(false);
        }
    };


    const extractQuestions = (raw) => {
        try {
            if (typeof raw === "string") {
                raw = JSON.parse(raw);   // 🔥 ONLY ONE PARSE
            }

            if (!Array.isArray(raw)) return [];

            return raw.map((q) => ({
                question: q.question,
                answer: q.answer,
            }));
        } catch (err) {
            console.error("Question parse error ❌", err);
            return [];
        }
    };

    if (loading) {
        return <p className="mt-10 text-center">Loading interview...</p>;
    }

    return (
        <div >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                <div className="w-full">
                    <QuestionSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </div>

                <div>
                    <RecordAnswerSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeIndex={activeIndex}
                        interviewData={interviewData}
                    />
                </div>
            </div>
            
            <div className="flex justify-end gap-6  ">
                {activeIndex>0&& 
                <Button onClick={()=>setActiveIndex(activeIndex-1)}>Previous Question</Button>}

                {activeIndex!=mockInterviewQuestion?.length-1&& 
                <Button onClick={()=>setActiveIndex(activeIndex+1)}>Next Question</Button>}

                {activeIndex==mockInterviewQuestion?.length-1&& 
                <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
                    <Button>End Interview</Button>
                </Link>}
                

            </div>

        </div>
    );
}

export default StartInterview;
