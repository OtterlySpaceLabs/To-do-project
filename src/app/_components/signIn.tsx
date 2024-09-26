"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button className="bg-indigo-600 py-3 px-3 rounded-md" onClick={() => signIn('discord', { callbackUrl: '/tasks' })}>
            Sign in with Discord
        </button>
    )
}