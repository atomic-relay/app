"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { SharedStateProvider } from "@/providers/SharedStateProvider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { Secrets } from "@/components/types";
import { resetSecrets, truncateString } from "@/lib/utils";
import WrapperComponent from "@/components/WrapperComponent";

const WalletPage: NextPage = () => {
  const [showConfigure, setShowConfigure] = useState<boolean>(false);
  const [secrets, setSecrets] = useState<Secrets | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSecrets();
  }, []);

  const fetchSecrets = async () => {
    setIsLoading(true);

    const secrets = await fetch("/api/getSecrets").then((res) => res.json());

    if (
      secrets.accountId &&
      secrets.jwtPublicSigningKey &&
      secrets.jwtPrivateSigningKey
    ) {
      setSecrets({
        accountId: secrets.accountId,
        jwtPublicSigningKey: secrets.jwtPublicSigningKey,
        jwtPrivateSigningKey: secrets.jwtPrivateSigningKey,
      });
    }

    setIsLoading(false);
  };

  const onCloseConfigure = () => {
    setShowConfigure(false);
    fetchSecrets();
  };

  const ConfigContent = () => {
    const [progress, setProgress] = useState(13);

    useEffect(() => {
      if (isLoading) {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
      }
    }, [isLoading]);

    if (isLoading) {
      return <Progress value={progress} className="w-[60%]" />;
    }

    if (!secrets) {
      return (
        <Button size="sm" onClick={() => setShowConfigure(true)}>
          Connect Account
        </Button>
      );
    }
    return (
      <>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="accountId"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            Account ID
          </Label>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            {truncateString(secrets.accountId, 8, 8)}
          </p>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="jwtPublicSigningKey"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            JWT Public Key
          </Label>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            {truncateString(secrets.jwtPublicSigningKey, 21, 0)}
          </p>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="jwtPrivateSigningKey"
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            JWT Private Key
          </Label>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
            Saved to Replit
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="w-fit ml-2"
          onClick={resetSecrets}
        >
          reset secrets
        </Button>
      </>
    );
  };

  return (
    <WrapperComponent id="Home" className="flex flex-col">
      <div id="Home" className="flex flex-col">
        <main className="min-h-screen flex flex-col items-left self-center max-w-[854px] w-4/5">
          <div id="setup-replit" className="mt-12">
            <SharedStateProvider>
              <div></div>
            </SharedStateProvider>
          </div>
        </main>
      </div>
    </WrapperComponent>
  );
};

export default WalletPage;
