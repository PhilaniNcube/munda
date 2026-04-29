"use client";

import React, { Suspense } from "react";
import LoggedInButtons from "./logged-in-buttons";

const AuthButtons = () => {
    return (
        <div className="flex items-center gap-3">
            <Suspense fallback={<div className="w-9 h-9 rounded-full bg-muted animate-pulse border border-gray-200" />}>
                <LoggedInButtons />
            </Suspense>
        </div>
    );
};

export default AuthButtons;