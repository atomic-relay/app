//@ts-nocheck
import { Inngest } from "inngest";
import { serve } from "inngest/next";
import {
  createClient,
  CreateAccountError,
  CreateTransferError,
} from "tigerbeetle-node";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { event, body: "Hello, World!" };
  },
);

const tigerBeetle = inngest.createFunction(
  { id: "tigerbeetle" },
  { event: "prod/tigerbeetle" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    const client = createClient({
      cluster_id: 0n,
      replica_addresses: [process.env.TB_ADDRESS || "3000"],
    });
    let accountErrors = await client.createAccounts([
      {
        id: 1n,
        debits_pending: 0n,
        debits_posted: 0n,
        credits_pending: 0n,
        credits_posted: 0n,
        user_data_128: 0n,
        user_data_64: 0n,
        user_data_32: 0,
        reserved: 0,
        ledger: 1,
        code: 1,
        flags: 0,
        timestamp: 0n,
      },
      {
        id: 2n,
        debits_pending: 0n,
        debits_posted: 0n,
        credits_pending: 0n,
        credits_posted: 0n,
        user_data_128: 0n,
        user_data_64: 0n,
        user_data_32: 0,
        reserved: 0,
        ledger: 1,
        code: 1,
        flags: 0,
        timestamp: 0n,
      },
    ]);
    for (const error of accountErrors) {
      console.error(
        `Batch account at ${error.index} failed to create: ${CreateAccountError[error.result]}.`,
      );
    }
    let transferErrors = await client.createTransfers([
      {
        id: 1n,
        debit_account_id: 1n,
        credit_account_id: 2n,
        amount: 10n,
        pending_id: 0n,
        user_data_128: 0n,
        user_data_64: 0n,
        user_data_32: 0,
        timeout: 0,
        ledger: 1,
        code: 1,
        flags: 0,
        timestamp: 0n,
      },
    ]);
    for (const error of transferErrors) {
      console.error(
        `Batch transfer at ${error.index} failed to create: ${CreateTransferError[error.result]}.`,
      );
    }
    let accounts = await client.lookupAccounts([1n, 2n]);
    for (let account of accounts) {
      if (account.id === 1n) {
        console.log("All Good");
      } else if (account.id === 2n) {
        console.log("All Good");
      } else {
        console.error(`fail`);
      }
    }
    return { event, body: "All good!" };
  },
);

// Create an API that serves zero functions
export default serve({
  client: inngest,
  functions: [
    helloWorld, // <-- This is where you'll always add your new functions
    tigerBeetle,
  ],
});
