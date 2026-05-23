'use client';

import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}