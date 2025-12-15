"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        if (params?.interviewId) {
            fetchInterview();
        }
    }, [params]);

    const fetchInterview = async () => {
        const res = await fetch(`/api/interview/${params.interviewId}`);

        // ✅ IMPORTANT GUARD
        if (!res.ok) {
            console.error("API failed");
            return;
        }

        const json = await res.json();
        if (json.success) {
            setInterviewData(json.data);
        }
    };

    if (!interviewData) {
        return <p className="mt-10 text-center">Loading interview...</p>;
    }

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        <h2><strong>Job Role:</strong> {interviewData.jobPosition}</h2>
                        <h2><strong>Tech Stack:</strong> {interviewData.jobDesc}</h2>
                        <h2><strong>Experience:</strong> {interviewData.jobExperience}</h2>
                    </div>

                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50">
                        <h2 className="flex gap-2 items-center text-yellow-500">
                            <Lightbulb /> <strong>Information</strong>
                        </h2>
                        <p className="mt-3 text-yellow-600">
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </p>
                    </div>
                </div>

                <div>
                    {webCamEnabled ? (
                        <Webcam
                            mirrored
                            style={{ height: 300, width: 300 }}
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-xl" />
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex justify-end mt-5">
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                    <Button>Start Interview</Button>
                </Link>
                
            </div>
        </div>
    );
}

export default Interview;
