"use client";

export default function ExperienceSection({ experience, setExperience }) {
    const years = [1, 2, 3, 4, 5];

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">Select Experience</h2>

            <div className="flex gap-3 flex-wrap">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setExperience(year)}
                        className={`px-4 py-2 border rounded
                        ${experience === year ? "bg-black text-white" : ""}`}
                    >
                        {year} Years
                    </button>
                ))}
            </div>
        </div>
    );
}
