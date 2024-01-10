require('dotenv').config();
import { AccountTokenAuthProvider, LightsparkClient, InvoiceType } from "@lightsparkdev/lightspark-sdk";
const API_TOKEN_CLIENT_ID = process.env.LIGHTSPARK_API_KEY || '018cea3f48b24f890000cd68bef8115e';
const API_TOKEN_CLIENT_SECRET = process.env.LIGHTSPARK_SECRET || 'KSTHhHugjXnHPwilBY2mYVxf4ecNEL2JSFkqxL4nrIY';

export default async function handler() {
	const lightSparkClient = new LightsparkClient(
		new AccountTokenAuthProvider(API_TOKEN_CLIENT_ID, API_TOKEN_CLIENT_SECRET)
	);

	const encodedInvoice = await lightSparkClient.createInvoice("123", 100, "Whasssupppp", InvoiceType.AMP)
	const invoiceDetails = await lightSparkClient.decodeInvoice(encodedInvoice || '');
	console.log(invoiceDetails);
}
