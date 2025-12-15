import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
    return (
        <div className="w-full min-h-screen">
            <Header />

            {/* 🔥 FULL WIDTH CONTENT — NO SIDE GAP */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
