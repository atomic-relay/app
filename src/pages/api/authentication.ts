require("dotenv").config();
import {
  AccountTokenAuthProvider,
  LightsparkClient,
  InvoiceType,
} from "@lightsparkdev/lightspark-sdk";
const API_TOKEN_CLIENT_ID = process.env.NEXT_LIGHTSPARK_API_KEY || "";
const API_TOKEN_CLIENT_SECRET = process.env.LIGHTSPARK_SECRET || "";

export default async function handler() {
  const lightSparkClient = new LightsparkClient(
    new AccountTokenAuthProvider(API_TOKEN_CLIENT_ID, API_TOKEN_CLIENT_SECRET),
  );

  const encodedInvoice = await lightSparkClient.createInvoice(
    "123",
    100,
    "Whasssupppp",
    InvoiceType.AMP,
  );
  const invoiceDetails = await lightSparkClient.decodeInvoice(
    encodedInvoice || "",
  );
  console.log(invoiceDetails);
}
