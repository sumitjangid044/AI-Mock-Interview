export default function HowItWorksPage() {
    return (
        <div className="w-full h-full p-8">
            <h1 className="text-3xl font-bold mb-6">
                How It Works
            </h1>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ================= LEFT : MOCK INTERVIEW ================= */}
                <div className="border rounded-xl p-6 bg-white shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">
                        🎤 Mock Interview
                    </h2>

                    <div className="space-y-5">

                        <div className="flex gap-3">
                            <span className="font-bold">1.</span>
                            <p>
                                Create a new mock interview by selecting
                                job role and experience level.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">2.</span>
                            <p>
                                AI generates real interview questions
                                based on your profile.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">3.</span>
                            <p>
                                Answer questions using voice or text
                                in a real interview environment.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">4.</span>
                            <p>
                                Get instant AI feedback, scores,
                                and improvement suggestions.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">5.</span>
                            <p>
                                Track your performance and retry
                                interviews to improve confidence.
                            </p>
                        </div>

                    </div>
                </div>

                {/* ================= RIGHT : INTERVIEW QUESTIONS ================= */}
                <div className="border rounded-xl p-6 bg-white shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4">
                        📚 Interview Questions
                    </h2>

                    <div className="space-y-5">

                        <div className="flex gap-3">
                            <span className="font-bold">1.</span>
                            <p>
                                Select your interview category like
                                Frontend, Backend, Full Stack, or React.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">2.</span>
                            <p>
                                Choose your experience level
                                (1–10 years).
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">3.</span>
                            <p>
                                AI generates coding and theory
                                interview questions.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">4.</span>
                            <p>
                                Reveal answers on demand with
                                detailed explanations.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="font-bold">5.</span>
                            <p>
                                Practice repeatedly and prepare
                                confidently for real interviews.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
