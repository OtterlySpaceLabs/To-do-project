"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button className="bg-gradient-to-r from-primaryGradient to-primary py-3 px-3 rounded-md shadow-lg hover:from-primaryGradient hover:to-primaryGradient hover:shadow-xl" onClick={() => signIn('discord', { callbackUrl: '/tasks' })}>
            Sign in with Discord
        </button>
    )
}