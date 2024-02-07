"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DevOverlay from "@/components/DevOverlay";
import { useEnvironmentSettings } from "@/providers/EnvironmentSettingsProvider";
import Configure from "@/components/Configure";
import Playground from "@/components/Playground";
import { SharedStateProvider } from "@/providers/SharedStateProvider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Secrets } from "@/components/types";
import { resetSecrets, truncateString } from "@/lib/utils";

const Home: NextPage = () => {
  const { isDevModeOn } = useEnvironmentSettings();
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

  const Step = ({ num, text }: { num: number; text: string }) => {
    return (
      <div className="flex flex-row -ml-12">
        <div className="h-10 grid place-content-center mr-4">
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full grid place-content-center">
            {num}
          </div>
        </div>
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight mt-1.5">
          {text}
        </h4>
      </div>
    );
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
          reset
        </Button>
      </>
    );
  };

  return (
    <div id="Home" className="flex flex-col">
      <Head>
        <title>Lightspark wallet demo</title>
        <meta
          name="description"
          content="Test Lightspark's Wallet SDK. Quickly create wallets and make test Bitcoin payments between them."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen pt-24 pb-16 flex flex-col justify-center items-left self-center max-w-[854px] w-4/5">
        {isDevModeOn && <DevOverlay />}
        <Configure isOpen={showConfigure} close={onCloseConfigure} />

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Create wallets and make test payments on Lightning.
        </h1>
        <p className="text-xl text-muted-foreground max-w-[636px]">
          The Lightspark Replit playground let’s you test and see how our SDK
          works. Quickly create wallets, and make test Bitcoin payments between
          them.
        </p>

        <div id="setup-replit" className="mt-12">
          <h2 className="scroll-m-20 mb-12 text-3xl font-semibold tracking-tight transition-colors">
            Setup your replit
          </h2>
          <Step num={1} text="Create an account" />
          <div className="flex flex-row h-full">
            <Separator
              className="-ml-8 h-auto"
              orientation="vertical"
              decorative
            />
            <p className="leading-7 ml-8 mb-14 text-muted-foreground">
              <a href="https://app.lightspark.com/signup" target="_blank">
                Signup
              </a>{" "}
              for a Lightspark account. This only takes a minute or two.
            </p>
          </div>
          <Step num={2} text="Connect Lightspark to Replit" />
          <div className="flex flex-row h-full">
            <Separator
              className="-ml-8 h-auto"
              orientation="vertical"
              decorative
            />
            <div className="flex flex-col ml-8 mb-14 w-full">
              <p className="leading-7 pb-6 text-muted-foreground">
                Launch our configuration tool to walkthrough connecting your
                Replit to your Lightspark account.
              </p>
              <Card className="h-[86px]">
                <CardContent className="flex items-center justify-center w-full h-full p-6">
                  <ConfigContent />
                </CardContent>
              </Card>
            </div>
          </div>
          <Step num={3} text="Create wallets and send transactions" />
          <SharedStateProvider>
            <Playground isConfigured={!!secrets} />
          </SharedStateProvider>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
