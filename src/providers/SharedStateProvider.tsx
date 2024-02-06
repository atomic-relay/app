import { Invoice } from "@lightsparkdev/wallet-sdk";
import React, { useState } from "react";
import { WalletName } from "@/components/types";
import { generateRandomWalletId, getOtherWalletName, omit } from "@/lib/utils";

export interface ActivityLog {
  timestamp: Date;
  event: string;
  status?: string;
}

export interface WalletInfo {
  id: string;
  invoices: Invoice[];
  status?: string;
  balance?: string;
}

interface SharedStateContextType {
  activityLogs: ActivityLog[];
  addActivityLog: (activityLog: ActivityLog) => void;
  addInvoice: (walletName: WalletName, invoice: Invoice) => void;
  addSendInvoice: (walletName: WalletName, invoice: Invoice) => void;
  addWallet: (walletName: WalletName) => void;
  getWalletId: (walletName: WalletName) => string;
  invoicePerWallet: Record<string, Invoice>;
  numWallets: number;
  removeInvoice: (walletName: WalletName) => void;
  removeSendInvoice: (walletName: WalletName) => void;
  sendInvoicePerWallet: Record<WalletName, Invoice>;
}

let SharedStateContext = React.createContext<SharedStateContextType>(null!);

/**
 * Context provider that provides shared state between components.
 */
export const SharedStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // @ts-ignore
  const [wallets, setWallets] = useState<Record<WalletName, WalletInfo>>({});
  const [numWallets, setNumWallets] = useState(0);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // @ts-ignore
  /**
   * Keeps track of an invoice that a wallet has created.
   */
  const [invoicePerWallet, setInvoicePerWallet] = useState<
    Partial<Record<WalletName, Invoice>>
  >({});

  /**
   * This is a special invoice saved per wallet that allows another wallet to send any amount.
   */
  const [sendInvoicePerWallet, setSendInvoicePerWallet] = useState<
    Partial<Record<WalletName, Invoice>>
  >({});

  const addWallet = (walletName: WalletName) => {
    const walletInfo = {
      id: generateRandomWalletId(),
      invoices: [],
    };
    setWallets({ ...wallets, [walletName]: walletInfo });
    setNumWallets(numWallets + 1);
  };

  const getWalletId = (walletName: WalletName) => {
    return wallets[walletName].id;
  };

  const addInvoice = (walletName: WalletName, invoice: Invoice) => {
    addActivityLog({
      timestamp: new Date(),
      event: `Wallet ${walletName} requested ${invoice.data.amount.originalValue} sats ${invoice.data.memo ? `for ${invoice.data.memo} ` : ""}from Wallet ${getOtherWalletName(walletName)}`,
      status: "Request sent",
    });
    setInvoicePerWallet({
      ...invoicePerWallet,
      [walletName]: invoice,
    });
  };

  const removeInvoice = (walletName: WalletName) => {
    setInvoicePerWallet(omit(walletName, invoicePerWallet));
  };

  const addSendInvoice = (walletName: WalletName, invoice: Invoice) => {
    setSendInvoicePerWallet({
      ...sendInvoicePerWallet,
      [walletName]: invoice,
    });
  };

  const removeSendInvoice = (walletName: WalletName) => {
    setSendInvoicePerWallet(omit(walletName, sendInvoicePerWallet));
  };

  const addActivityLog = (activityLog: ActivityLog) => {
    setActivityLogs((prevState) => [activityLog, ...prevState]);
  };

  const value = {
    activityLogs,
    addActivityLog,
    addInvoice,
    addSendInvoice,
    addWallet,
    getWalletId,
    invoicePerWallet,
    numWallets,
    removeInvoice,
    removeSendInvoice,
    sendInvoicePerWallet,
  };

  return (
    // @ts-ignore
    <SharedStateContext.Provider value={value}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  return React.useContext(SharedStateContext);
};
