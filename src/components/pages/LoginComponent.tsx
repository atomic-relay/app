"use client";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
export default function LoginComponent() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/login" />
      </SignedIn>
      <SignedOut>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </SignedOut>
    </div>
  );
}
