"use client";

import { useEffect, useState } from "react";

export default function QuestionsView({ category, experience }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loadingIndex, setLoadingIndex] = useState(null);

    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // =========================
    // FETCH QUESTIONS (CHUNKED)
    // =========================
    const fetchQuestions = async (isLoadMore = false) => {
        try {
            isLoadMore ? setLoadingMore(true) : setLoadingQuestions(true);

            const res = await fetch("/api/get-questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category,
                    experience,
                    offset,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setQuestions((prev) =>
                    isLoadMore ? [...prev, ...data.questions] : data.questions
                );
                setHasMore(data.hasMore);
            }
        } catch (err) {
            console.error("Question fetch error", err);
        } finally {
            setLoadingQuestions(false);
            setLoadingMore(false);
        }
    };

    // =========================
    // RESET & INITIAL LOAD
    // =========================
    useEffect(() => {
        if (!category || !experience) return;

        setQuestions([]);
        setAnswers({});
        setOffset(0);
        setHasMore(true);

        fetchQuestions(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, experience]);

    // =========================
    // GENERATE ANSWER
    // =========================
    const generateAnswer = async (q, index) => {
        // toggle hide
        if (answers[index]) {
            setAnswers((prev) => {
                const copy = { ...prev };
                delete copy[index];
                return copy;
            });
            return;
        }

        setLoadingIndex(index);

        try {
            const res = await fetch("/api/generate-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: q.question,
                    category,
                    experience,
                }),
            });

            const data = await res.json();

            setAnswers((prev) => ({
                ...prev,
                [index]: data.answer,
            }));
        } catch (err) {
            console.error("Answer error", err);
        } finally {
            setLoadingIndex(null);
        }
    };

    // =========================
    // UI
    // =========================
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Interview Questions</h2>

            {/* INITIAL LOADER */}
            {loadingQuestions && questions.length === 0 && (
                <div className="space-y-3 animate-pulse">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="border p-4 rounded">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3" />
                            <div className="h-3 bg-gray-200 rounded w-1/4" />
                        </div>
                    ))}
                </div>
            )}

            {/* QUESTIONS LIST */}
            {questions.map((q, i) => (
                <div key={i} className="border p-4 rounded mb-4">
                    <p className="font-semibold mb-2">
                        Q{i + 1}. {q.question}
                    </p>

                    <button
                        onClick={() => generateAnswer(q, i)}
                        disabled={loadingIndex === i}
                        className={`px-3 py-1 border rounded text-sm transition-all
                        ${
                            loadingIndex === i
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:shadow-lg"
                        }`}
                    >
                        {loadingIndex === i
                            ? "Generating..."
                            : answers[i]
                            ? "Hide Answer"
                            : "Show Answer"}
                    </button>

                    {answers[i] && (
                        <p className="mt-3 text-gray-700 whitespace-pre-line">
                            {answers[i]}
                        </p>
                    )}
                </div>
            ))}

            {/* LOAD MORE */}
            {hasMore && questions.length > 0 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => {
                            const newOffset = offset + 5;
                            setOffset(newOffset);
                            fetchQuestions(true);
                        }}
                        disabled={loadingMore}
                        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                    >
                        {loadingMore ? "Loading more..." : "Load more questions"}
                    </button>
                </div>
            )}
        </div>
    );
}
