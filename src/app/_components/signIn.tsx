"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button onClick={() => signIn('discord', { callbackUrl: '/tasks' })}>
            Sign in with Discord
        </button>
    )
}