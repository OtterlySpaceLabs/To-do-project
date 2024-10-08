"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      id="sign-in-button"
      className="mt-6 rounded-md bg-gradient-to-r from-primaryGradient to-primary px-3 py-3 shadow-lg hover:from-primaryGradient hover:to-primaryGradient hover:shadow-xl"
      onClick={() => signIn("discord", { callbackUrl: "/tasks" })}
    >
      Sign in with Discord
    </button>
  );
}
