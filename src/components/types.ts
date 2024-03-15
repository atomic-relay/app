export interface Secrets {
  accountId: string;
  jwtPublicSigningKey: string;
  jwtPrivateSigningKey: string;
}

export enum WalletName {
  A = "A",
  B = "B",
}
