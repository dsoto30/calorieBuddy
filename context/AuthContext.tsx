"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);



    return (
        <AuthContext.Provider value={{ user: user ?? null, loading: loading }}>

        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);