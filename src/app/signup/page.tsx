"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import WrapperComponent from "@/components/WrapperComponent";

function Signup() {
  const [emailAddress, setEmailAddress] = useState("");
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  if (!signUp) {
    return (
      <WrapperComponent>
        <SignupForm submit={submit} />
      </WrapperComponent>
    );
  }

  const { startMagicLinkFlow, cancelMagicLinkFlow } =
    signUp.createMagicLinkFlow();

  async function submit(e: any) {
    e.preventDefault();
    setExpired(false);
    setVerified(false);
    if (signUp) {
      await signUp.create({ emailAddress });
      const su = await startMagicLinkFlow({
        redirectUrl: "https://app.atomicrelay.co/verification",
      });
      const verification = su.verifications.emailAddress;
      if (verification.verifiedFromTheSameClient()) {
        setVerified(true);
        return;
      } else if (verification.status === "expired") {
        setExpired(true);
      }
      if (su.status === "complete") {
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
    <WrapperComponent>
      <SignupForm submit={submit} />
    </WrapperComponent>
  );
}

function SignupForm({ submit }: any) {
  const [emailAddress, setEmailAddress] = useState("");
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

export default Signup;
