"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button className="bg-indigo-600 py-3 px-3 rounded-md" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out from Discord
        </button>
    )
}