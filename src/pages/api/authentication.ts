require('dotenv').config();
import { AccountTokenAuthProvider, LightsparkClient, InvoiceType, CurrencyUnit } from "@lightsparkdev/lightspark-sdk";
const API_TOKEN_CLIENT_ID = process.env.LIGHTSPARK_API_KEY || '';
const API_TOKEN_CLIENT_SECRET = process.env.LIGHTSPARK_SECRET || '';

export default async function handler() {
	const lightSparkClient = new LightsparkClient(
		new AccountTokenAuthProvider(API_TOKEN_CLIENT_ID, API_TOKEN_CLIENT_SECRET)
	);

	// nodeId: string, amountMsats: number, memo: string, type?: InvoiceType | undefined, expirySecs?: number | undefined
	const encodedInvoice = await lightSparkClient.createInvoice("123", 100, "Whasssupppp", InvoiceType.AMP)
	const invoiceDetails = await lightSparkClient.decodeInvoice(encodedInvoice || '');
	console.log(invoiceDetails);

}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '1mb',
			// bodyParser: false,
		},
	},
	// Specifies the maximum allowed duration for this function to execute (in seconds)
	maxDuration: 5,
}
