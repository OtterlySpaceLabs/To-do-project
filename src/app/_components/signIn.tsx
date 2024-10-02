"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
    return (
        <button
            id="sign-in-button"
            className="bg-gradient-to-r from-primaryGradient to-primary py-3 px-3 mt-6 rounded-md shadow-lg hover:shadow-xl hover:from-primaryGradient hover:to-primaryGradient"
            onClick={() => signIn('discord', { callbackUrl: '/tasks' })}>
            Sign in with Discord
        </button>
    )
}