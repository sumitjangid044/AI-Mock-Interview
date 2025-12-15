"use client";

import { ChevronRight } from "lucide-react";

export default function CategorySection({
    category,
    setCategory,
    experience,
    setExperience,
}) {
    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "React Developer",
        "Node.js Developer",
        "Java Developer",
        "Python Developer",
        "DevOps Engineer",
        "Mobile App Developer",
        "Software Engineer",
    ];

    // 🔥 EXPERIENCE: 1 to 10 YEARS
    const years = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="flex flex-col gap-3">

            {categories.map((item) => {
                const isOpen = category === item;

                return (
                    <div key={item} className="transition-all duration-300">

                        {/* CATEGORY BUTTON */}
                        <button
                            onClick={() => {
                                setCategory(item);
                                setExperience(null);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2 rounded border
                            transition-all duration-300
                            ${isOpen
                                ? "bg-black text-white shadow-md scale-[1.02]"
                                : "bg-white hover:bg-gray-100"}`}
                        >
                            <span>{item}</span>

                            {/* ICON */}
                            <ChevronRight
                                className={`w-4 h-4 transition-transform duration-300
                                ${isOpen ? "rotate-90" : "rotate-0"}`}
                            />
                        </button>

                        {/* EXPERIENCE ACCORDION (SCROLL ENABLED) */}
                        <div
                            className={`transition-all duration-300 ease-in-out
                            ${isOpen
                                ? "max-h-56 mt-2 overflow-y-auto"
                                : "max-h-0 overflow-hidden"}`}
                        >
                            <div className="ml-5 flex flex-col gap-2 pr-2">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setExperience(year)}
                                        className={`text-left px-3 py-1.5 rounded border text-sm
                                        transition-all duration-200
                                        ${experience === year
                                            ? "bg-blue-600 text-white scale-105 shadow"
                                            : "bg-white hover:bg-gray-100"}`}
                                    >
                                        {year} Years
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                );
            })}

        </div>
    );
}
