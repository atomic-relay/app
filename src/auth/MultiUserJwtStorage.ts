import { AccessTokenInfo, AccessTokenStorage } from "@lightsparkdev/wallet-sdk";
import { BlockchainNetwork } from "@/providers/EnvironmentSettingsProvider";

/**
 * Multi-user implementation of LocalStorageJwtStorage. For normal use cases where a single user has to log in, just use LocalStorageJwtStorage in the wallet-sdk.
 * This uses Replit db instead of localStorage due to Replit not having access to localStorage in preview windows.
 */
class MultiUserJwtStorage implements AccessTokenStorage {
  private userName: string;
  private blockchainNetwork: BlockchainNetwork;
  private deploymentEnvironment: string;
  constructor(
    userName: string,
    blockchainNetwork: BlockchainNetwork,
    deploymentEnvironment: string,
  ) {
    this.userName = userName;
    this.blockchainNetwork = blockchainNetwork;
    this.deploymentEnvironment = deploymentEnvironment;
  }

  async getCurrent(): Promise<AccessTokenInfo | null> {
    const tokenInfo = await fetch(
      `/api/jwtStorage?userName=${this.userName}&blockchainNetwork=${this.blockchainNetwork}&deploymentEnvironment=${this.deploymentEnvironment}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    if (!tokenInfo) {
      return null;
    }

    return {
      accessToken: tokenInfo.accessToken,
      validUntil: new Date(tokenInfo.validUntil),
    };
  }

  async replace(tokenInfo: AccessTokenInfo): Promise<void> {
    await fetch(`/api/jwtStorage`, {
      method: "POST",
      body: JSON.stringify({
        userName: this.userName,
        blockchainNetwork: this.blockchainNetwork,
        deploymentEnvironment: this.deploymentEnvironment,
        accessToken: tokenInfo.accessToken,
        validUntil: tokenInfo.validUntil.toISOString(),
      }),
    });
  }

  async clear(): Promise<void> {
    await fetch(`/api/jwtStorage`, {
      method: "DELETE",
      body: JSON.stringify({
        userName: this.userName,
        blockchainNetwork: this.blockchainNetwork,
        deploymentEnvironment: this.deploymentEnvironment,
      }),
    });
  }
}

export default MultiUserJwtStorage;
