import {
  LightsparkClient,
  CustomJwtAuthProvider,
  AccessTokenStorage,
  LoginWithJWTOutput,
} from "@lightsparkdev/wallet-sdk";
import React, { useEffect, useState } from "react";
import MultiUserJwtStorage from "../auth/MultiUserJwtStorage";
import { useEnvironmentSettings } from "./EnvironmentSettingsProvider";

export interface LightsparkClientContextType {
  isLoaded: boolean;
  getClient: () => LightsparkClient;
  getUserName: () => string;
  isAuthorized: () => Promise<boolean>;
  login: (accountId: string, jwt: string) => Promise<LoginWithJWTOutput>;
  logout: () => Promise<void>;
}

let LightsparkClientContext = React.createContext<LightsparkClientContextType>(
  null!,
);

/**
 * Provides a context for managing the app's Lightspark Client.
 */
function LightsparkClientProvider({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const {
    isLoaded: isEnvLoaded,
    blockchainNetwork,
    deploymentEnvironment,
  } = useEnvironmentSettings();
  const [isLoaded, setIsLoaded] = useState(false);
  const [jwtStorage, setJwtStorage] = useState<
    AccessTokenStorage | undefined
  >();
  const [authProvider, setAuthProvider] = useState<
    CustomJwtAuthProvider | undefined
  >();
  const [client, setClient] = useState<LightsparkClient | undefined>();

  useEffect(() => {
    if (isEnvLoaded) {
      const jwtStorage = new MultiUserJwtStorage(
        userName,
        blockchainNetwork,
        deploymentEnvironment,
      );
      const authProvider = new CustomJwtAuthProvider(jwtStorage);
      setJwtStorage(jwtStorage);
      setAuthProvider(authProvider);
      setClient(new LightsparkClient(authProvider, deploymentEnvironment));
      setIsLoaded(true);
    }
  }, [isEnvLoaded]);

  const getClient = () => {
    return client;
  };

  const getUserName = () => {
    return userName;
  };

  const isAuthorized = async (): Promise<boolean> => {
    return client?.isAuthorized() || false;
  };

  const login = (accountId: string, jwt: string) => {
    if (!client || !isLoaded || !jwtStorage) {
      throw new Error(
        "Only call login if client is finished loading (client.isLoaded).",
      );
    }

    return client.loginWithJWT(accountId, jwt, jwtStorage);
  };

  const logout = () => {
    return authProvider?.logout();
  };

  let value = {
    isLoaded,
    getClient,
    getUserName,
    isAuthorized,
    login,
    logout,
  };

  return (
    // @ts-ignore
    <LightsparkClientContext.Provider value={value}>
      {children}
    </LightsparkClientContext.Provider>
  );
}

export function useLightsparkClient() {
  return React.useContext(LightsparkClientContext);
}

export default LightsparkClientProvider;
