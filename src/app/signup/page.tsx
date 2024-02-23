"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

export default function SignUp() {
  const [emailAddress, setEmailAddress] = useState("");
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  if (!isLoaded) {
    return null;
  }
  const { startMagicLinkFlow, cancelMagicLinkFlow } =
    signUp.createMagicLinkFlow();

  async function submit(e: any) {
    e.preventDefault();
    setExpired(false);
    setVerified(false);
    if (signUp) {
      // Start the sign up flow, by collecting
      // the user's email address.
      await signUp.create({ emailAddress });

      // Start the magic link flow.
      // Pass your app URL that users will be navigated
      // when they click the magic link from their
      // email inbox.
      // su will hold the updated sign up object.
      const su = await startMagicLinkFlow({
        redirectUrl: "http://localhost:3000/verification",
      });

      // Check the verification result.
      const verification = su.verifications.emailAddress;
      if (verification.verifiedFromTheSameClient()) {
        setVerified(true);
        return;
      } else if (verification.status === "expired") {
        setExpired(true);
      }

      if (su.status === "complete") {
        // Sign up is complete, we have a session.
        // Navigate to the after sign up URL.
        setActive({ session: su.createdSessionId || "" });
        router.push("/after-sign-up");
        return;
      }
    }
  }

  if (expired) {
    return <div>Magic link has expired</div>;
  }

  if (verified) {
    return <div>Signed in on other tab</div>;
  }

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <button type="submit">Sign up with magic link</button>
    </form>
  );
}
