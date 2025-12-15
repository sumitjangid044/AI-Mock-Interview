"use client";

import { useState } from "react";
import CategorySection from "./_components/CategorySection";
import QuestionsView from "./_components/QuestionsView";

export default function QuestionsPage() {
    const [category, setCategory] = useState(null);
    const [experience, setExperience] = useState(null);

    return (
        // 🔥 FULL WIDTH, NO SIDE PADDING
        <div className="flex w-full h-[calc(100vh-64px)]">

            {/* LEFT SIDEBAR — STICKS TO LEFT */}
            <aside className="w-72 min-w-[18rem] border-r bg-gray-50 overflow-y-auto">
                <div className="p-5">
                    <h2 className="text-lg font-bold mb-4 sticky top-0 bg-gray-50 pb-2">
                        Categories
                    </h2>

                    <CategorySection
                        category={category}
                        setCategory={setCategory}
                        experience={experience}
                        setExperience={setExperience}
                    />
                </div>
            </aside>

            {/* RIGHT CONTENT — TAKES FULL REMAINING WIDTH */}
            <main className="flex-1 overflow-y-auto p-8">

                {!category && (
                    <p className="text-gray-500 animate-pulse">
                        👈 Select a category to begin
                    </p>
                )}

                {category && !experience && (
                    <p className="text-gray-500 animate-pulse">
                        👈 Select experience for <b>{category}</b>
                    </p>
                )}

                {category && experience && (
                    <QuestionsView
                        category={category}
                        experience={experience}
                    />
                )}

            </main>
        </div>
    );
}
