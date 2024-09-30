"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button className="bg-primary py-3 px-3 rounded-md shadow-md " onClick={() => signIn('discord', { callbackUrl: '/tasks' })}>
            Sign in with Discord
        </button>
    )
}