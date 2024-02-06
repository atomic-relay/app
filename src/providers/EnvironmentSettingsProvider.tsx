"use client";

import React, { useState, useEffect } from "react";

export enum BlockchainNetwork {
  MAINNET = "MAINNET",
  REGTEST = "REGTEST",
  TESTNET = "TESTNET",
}

const DEFAULT_DEPLOYMENT_ENV = "api.lightspark.com";
const DEFAULT_BLOCKCHAIN_NET = BlockchainNetwork.REGTEST;

interface EnvironmentSettingsContextType {
  isLoaded: boolean;
  isDevModeOn: boolean;
  deploymentEnvironment: string;
  updateDeploymentEnvironment: (env: string) => void;
  blockchainNetwork: BlockchainNetwork;
  updateBlockchainNetwork: (network: BlockchainNetwork) => void;
}

let EnvironmentSettingsContext =
  React.createContext<EnvironmentSettingsContextType>(null!);

/**
 * Provides a context for managing the app's environment settings.
 */
const EnvironmentSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDevModeOn, setIsDevModeOn] = useState(false);
  const [deploymentEnvironment, setDeploymentEnvironment] = useState<string>(
    DEFAULT_DEPLOYMENT_ENV,
  );
  const [blockchainNetwork, setBlockchainNetwork] = useState<BlockchainNetwork>(
    DEFAULT_BLOCKCHAIN_NET,
  );

  useEffect(() => {
    const isDevModeOnLocalStorage =
      String(localStorage.getItem("isLightsparkDev")).toLocaleLowerCase() ===
      "true";
    setIsDevModeOn(isDevModeOnLocalStorage);

    if (!isDevModeOnLocalStorage) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isDevModeOn) {
      setDeploymentEnvironment(
        localStorage.getItem("lightspark-deployment-env") ||
          DEFAULT_DEPLOYMENT_ENV,
      );
      setBlockchainNetwork(
        (localStorage.getItem(
          "lightspark-blockchain-network",
        ) as BlockchainNetwork) || DEFAULT_BLOCKCHAIN_NET,
      );
      setIsLoaded(true);
    }
  }, [isDevModeOn]);

  const updateDeploymentEnvironment = (env: string) => {
    setDeploymentEnvironment(env);
    localStorage.setItem("lightspark-deployment-env", env);
    location.reload();
  };

  const updateBlockchainNetwork = (network: BlockchainNetwork) => {
    setBlockchainNetwork(network);
    localStorage.setItem("lightspark-blockchain-network", network);
    location.reload();
  };

  const value = {
    isLoaded,
    isDevModeOn,
    deploymentEnvironment,
    blockchainNetwork,
    updateDeploymentEnvironment,
    updateBlockchainNetwork,
  };

  return (
    <EnvironmentSettingsContext.Provider value={value}>
      {children}
    </EnvironmentSettingsContext.Provider>
  );
};

export function useEnvironmentSettings() {
  return React.useContext(EnvironmentSettingsContext);
}

export default EnvironmentSettingsProvider;
