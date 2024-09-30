"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button className="bg-accent text-white shadow-md text-sm px-3 py-2 rounded-md" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
        </button>
    )
}