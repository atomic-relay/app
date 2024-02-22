"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default function LoginComponent() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/login" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
