import {auth} from "@/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



const googleProvider = new GoogleAuthProvider();


export const signInWithEmail = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signUpWithEmail = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
}

export const logOut = async () => {
    return await signOut(auth);
}