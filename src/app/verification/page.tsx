"use client";

import { MagicLinkErrorCode, useClerk, isEmailLinkError } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

export default function Verification() {
  const [verificationStatus, setVerificationStatus] = useState("loading");

  const { handleEmailLinkVerification } = useClerk();

  useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: "https://app.atomicrelay.co/verification",
          redirectUrlComplete: "https://app.atomicrelay.co/dashboard",
        });
        // If we're not redirected at this point, it means
        // that the flow has completed on another device.
        setVerificationStatus("verified");
      } catch (err: any) {
        // Verification has failed.
        let status = "failed";
        if (isEmailLinkError(err) && err.code === MagicLinkErrorCode.Expired) {
          status = "expired";
        }
        setVerificationStatus(status);
      }
    }
    verify();
  }, []);

  if (verificationStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (verificationStatus === "failed") {
    return <div>Magic link verification failed</div>;
  }

  if (verificationStatus === "expired") {
    return <div>Magic link expired</div>;
  }

  return (
    <div>Successfully signed up. Return to the original tab to continue.</div>
  );
}
