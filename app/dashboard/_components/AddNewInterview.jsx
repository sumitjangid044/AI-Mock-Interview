"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    // const [jsonResponse, setJsonResponse]=useState([])
    const { user } = useUser();
    const router=useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const res = await fetch("/api/generate-interview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobPosition,
                    jobDesc,
                    jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                }),
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.error);
                return;
            }

            console.log("Saved Interview ID:", data.mockId);
            if(res)
            {
                setOpenDialog(false);
                router.push('/dashboard/interview/'+res[0]?.mockId)
            }

            setOpenDialog(false);
            alert("Interview Created Successfully 🚀");

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary cursor-pointer"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent onInteractOutside={() => setOpenDialog(false)}>
                    <DialogHeader>
                        <DialogTitle>Interview Details</DialogTitle>
                        <DialogDescription>
                            Enter job details to generate interview questions
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label>Job Role/Job Position</label>
                            <Input
                                placeholder="Job Role"
                                required
                                onChange={(e) => setJobPosition(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Job Description/ Tech Stack (In Short)</label>
                            <Textarea
                                placeholder="Job Description"
                                required
                                onChange={(e) => setJobDesc(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Years of Experience</label>
                            <Input
                                type="number"
                                placeholder="Experience"
                                required
                                onChange={(e) => setJobExperience(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-5 justify-end">
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog()}>
                                cancel
                            </Button>
                            <Button disabled={loading}>
                                {loading ?
                                    <>
                                        <LoaderCircle className="animate-spin" />'Generating From AI'
                                    </> : "Start Interview"
                                }

                            </Button>
                        </div>

                    </form>

                    {/* {result && (
                        <pre className="mt-4 p-3 bg-black text-green-400 text-sm rounded">
                            {result}
                        </pre>
                    )} */}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
