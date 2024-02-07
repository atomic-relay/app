"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useEnvironmentSettings,
  BlockchainNetwork,
} from "@/providers/EnvironmentSettingsProvider";
import { resetSecrets } from "@/lib/utils";

/**
 * Displays an overlay in the bottom right of the app that allows the user to configure
 * deployment/API environment and bitcoin network.
 *
 * Enable by setting `isLightsparkDev` to `true` in localStorage.
 */
const DevOverlay = () => {
  const {
    deploymentEnvironment,
    updateBlockchainNetwork,
    blockchainNetwork,
    updateDeploymentEnvironment,
  } = useEnvironmentSettings();
  const [customEnvUrl, setCustomEnvUrl] = useState("");

  const handleCustomUrlEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateDeploymentEnvironment(customEnvUrl);
    }
  };

  const SecretsButton = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Secrets</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Secrets</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem key="reset" onSelect={resetSecrets}>
            Reset all
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const DeploymentEnvironmentButton = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {getDeploymentEnvironmentName(deploymentEnvironment)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Deployment Environment</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key="prod"
            onSelect={() => updateDeploymentEnvironment("api.lightspark.com")}
          >
            prod
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem key="custom">custom</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const BlockchainNetworkButton = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{blockchainNetwork}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Bitcoin Network</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            key="regtest"
            onSelect={() => updateBlockchainNetwork(BlockchainNetwork.REGTEST)}
          >
            REGTEST
          </DropdownMenuItem>
          <DropdownMenuItem
            key="testnet"
            onSelect={() => updateBlockchainNetwork(BlockchainNetwork.TESTNET)}
          >
            TESTNET
          </DropdownMenuItem>
          <DropdownMenuItem
            key="mainnet"
            onSelect={() => updateBlockchainNetwork(BlockchainNetwork.MAINNET)}
          >
            MAINNET
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="absolute">
      <Dialog>
        <div className="flex flex-row justify-end items-end bottom-0 right-0 m-4 fixed z-50">
          <div className="ml-2">
            <SecretsButton />
          </div>
          <div className="ml-2">
            <DeploymentEnvironmentButton />
          </div>
          <div className="ml-2">
            <BlockchainNetworkButton />
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Set a custom URL for your development environment
            </DialogTitle>
          </DialogHeader>
          <Input
            type="string"
            placeholder="(e.g. http://127.0.0.1:5000)"
            value={customEnvUrl}
            onChange={(e) => setCustomEnvUrl(e.target.value)}
            onKeyPress={handleCustomUrlEnter}
          />
          <DialogFooter>
            <Button onClick={() => updateDeploymentEnvironment(customEnvUrl)}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function getDeploymentEnvironmentName(deploymentEnvironment: string): string {
  if (deploymentEnvironment.includes("api.lightspark.com")) {
    return "prod";
  } else {
    return "custom";
  }
}

export default DevOverlay;
