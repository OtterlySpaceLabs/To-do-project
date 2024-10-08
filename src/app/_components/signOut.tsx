"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="rounded-md bg-gradient-to-r from-accent to-accentGradient px-3 py-2 text-sm text-white shadow-md hover:from-accent hover:to-accent hover:shadow-xl"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </button>
  );
}
