import { WalletName } from "@/components/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const resetSecrets = async () => {
  await fetch("/api/resetSecrets");
  // Reloading too quickly can cause react to throw errors
  await new Promise((resolve) => setTimeout(resolve, 1000));
  location.reload();
};

export const truncateString = (
  str: string,
  startLength: number,
  endLength: number,
) => {
  return (
    str.slice(0, startLength) + "..." + (endLength ? str.slice(-endLength) : "")
  );
};

export const generateRandomWalletId = () => {
  return `demo-wallet-${uuidv4()}`;
};

export const getOtherWalletName = (walletName: WalletName) => {
  return Object.values(WalletName).find(
    (curr) => curr !== walletName,
  ) as WalletName;
};

export const omit = (key: string, obj: any) => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};
