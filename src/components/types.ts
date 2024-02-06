export interface UserState {
  isLoggedIn: boolean;
  userName?: string;
  accountId?: string;
  jwt?: string;
}

export interface LoggedInUserState extends UserState {
  isLoggedIn: true;
  userName: string;
  accountId: string;
  jwt: string;
}

export interface Secrets {
  accountId: string;
  jwtPublicSigningKey: string;
  jwtPrivateSigningKey: string;
}

export enum WalletName {
  A = "A",
  B = "B",
}
