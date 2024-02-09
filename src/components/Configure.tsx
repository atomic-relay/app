import { useEffect, useState, ReactElement } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Snippet } from "@/components/ui/snippet";

const NUM_STEPS = 2;

/**
 * Configuration dialog for setting up variables necessary for JWT auth.
 */
const Configure = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [step, setStep] = useState<number>(1);
  const [accountId, setAccountId] = useState<string>("");
  const [jwtPublicKey, setJwtPublicKey] = useState<string>("");
  const [jwtPrivateKey, setJwtPrivateKey] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      fetch("/api/generateJwtKeyPair")
        .then((res) => res.json())
        .then((res) => {
          setJwtPublicKey(res.jwtPublicSigningKey);
          setJwtPrivateKey(res.jwtPrivateSigningKey);
          setIsLoading(false);
        });
    }
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      close();
    }
  };

  const onChangeAccountId = async (accountId: string) => {
    setError(undefined);
    setAccountId(accountId);
  };

  const onSubmitAccountId = async () => {
    if (!accountId.startsWith("Account:")) {
      setError('Please enter an account ID starting with "Account:"');
      return false;
    }

    setError(undefined);

    return true;
  };

  const onDone = async () => {
    await fetch("/api/saveConfiguration", {
      method: "POST",
      body: JSON.stringify({
        accountId,
        jwtPublicKey,
        jwtPrivateKey,
      }),
    });
    return true;
  };

  const JwtShimmer = () => {
    return (
      <>
        <Skeleton className="w-4/5 rounded-lg mb-4">
          <div className="h-3 w-4/5 rounded-lg bg-default-200 mb-2"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200 mb-2"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200 mb-2"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200 mb-2"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg mb-4">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg mb-4">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg mb-4">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg mb-4">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg mb-4">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </>
    );
  };

  const JwtSection = () => {
    return (
      <>
        <div className="grid w-full items-center gap-1.5 mb-2">
          <Label htmlFor="jwtPublicKey" className="text-primary">
            JWT Public Key:
          </Label>
          <Snippet codeString={jwtPublicKey} />
        </div>

        <div className="grid w-full items-center gap-1.5 mb-2">
          <Label htmlFor="jwtPrivateKey" className="text-primary">
            JWT Private Key:
          </Label>
          <Snippet codeString={jwtPrivateKey} />
          <p className="text-sm text-muted-foreground mb-1">
            This will be saved in the Replit database.
          </p>
        </div>
      </>
    );
  };

  const StepperButtons = ({ onNext }: { onNext?: () => Promise<boolean> }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onNextStep = async () => {
      if (onNext) {
        const success = await onNext();

        if (success) {
          setStep(step + 1);
        }
        return;
      }
    };

    const onPreviousStep = () => {
      setStep(step - 1);
    };

    const onDoneInternal = async () => {
      if (onNext) {
        setIsSubmitting(true);
        const success = await onNext();
        setIsSubmitting(false);

        if (success) {
          close();
        }
        return;
      }
    };

    const BackButton = () => {
      return (
        <Button variant="outline" onClick={onPreviousStep} className="mr-2.5">
          Back
        </Button>
      );
    };

    const NextButton = () => {
      return <Button onClick={onNextStep}>Continue</Button>;
    };

    const FinishButton = () => {
      return (
        <Button disabled={isSubmitting} onClick={onDoneInternal}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Done
        </Button>
      );
    };

    return (
      <div>
        {step < NUM_STEPS && <NextButton />}
        {step >= NUM_STEPS && <BackButton />}
        {step >= NUM_STEPS && <FinishButton />}
      </div>
    );
  };

  const stepOne = (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="text-lg font-semibold">
            First, paste your account ID in Replit
          </div>
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          You’ll need to manually copy and paste a couple of things to connect
          your Replit to your Lightspark account. Everything is in your
          Lightspark{" "}
          <a
            href="https://app.lightspark.com/account#security:~:text=JWT%20public%20key-,Your%20account%20ID,-%3A"
            target="_blank"
          >
            account settings
          </a>
          .
        </p>
      </DialogHeader>

      <div className="grid w-full items-center gap-1.5 mt-4 mb-4">
        <Label
          htmlFor="accountId"
          className={`${error ? "text-red-500" : "text-primary"}`}
        >
          Account ID
        </Label>
        <Input
          type="text"
          placeholder="Paste Account ID"
          value={accountId}
          className={`${error ? "border-red-500" : ""}`}
          onChange={(e) => onChangeAccountId(e.target.value)}
        />
        {!error && (
          <p className="text-sm text-muted-foreground">
            Account:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
          </p>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <DialogFooter>
        <StepperButtons onNext={onSubmitAccountId} />
      </DialogFooter>
    </>
  );

  const stepTwo = (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="text-lg font-semibold">
            Finally, paste your JWT Public Key in Lightspark
          </div>
        </DialogTitle>
        <p className="text-sm text-muted-foreground">
          Weve automatically generated a JWT signing key pair for you. Normally,
          you would generate these yourself for security reasons, but for this
          demo use the key pair provided. Copy your JWT public key below, then
          in{" "}
          <a
            href="https://app.lightspark.com/account#security:~:text=Update%20wallet%20JWT%20public%20key"
            target="_blank"
          >
            account settings
          </a>{" "}
          click `Update wallet JWT public key`, paste the code, and select
          continue.
        </p>
      </DialogHeader>

      {isLoading && <JwtShimmer />}
      {!isLoading && <JwtSection />}

      <DialogFooter>
        <StepperButtons onNext={onDone} />
      </DialogFooter>
    </>
  );

  let stepContent: ReactElement;
  switch (step) {
    case 1:
      stepContent = stepOne;
      break;
    case 2:
    default:
      stepContent = stepTwo;
      break;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>{stepContent}</DialogContent>
    </Dialog>
  );
};

export default Configure;
