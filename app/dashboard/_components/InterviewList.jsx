"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        const res = await fetch(
            `/api/interview?email=${user?.primaryEmailAddress?.emailAddress}`
        );

        const data = await res.json();

        if (data.success) {
            setInterviewList(data.data);
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl ">Previous Mock Interview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                {interviewList && interviewList.map((interview, index) => (
                    <InterviewItemCard key={index} interview={interview} />
                ))}
            </div>
        </div>
    );
}

export default InterviewList;
