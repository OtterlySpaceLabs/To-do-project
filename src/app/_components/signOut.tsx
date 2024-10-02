"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button className="bg-gradient-to-r from-accent to-accentGradient text-white shadow-md text-sm px-3 py-2 rounded-md hover:shadow-xl hover:from-accent hover:to-accent" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
        </button>
    )
}