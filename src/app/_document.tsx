// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Main, Head, NextScript } from "next/document";
import {Inter} from "next/font/google";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<body className={inter.className}>
					<Theme accentColor="crimson" grayColor="sand" radius="large" >
						<Main />
						<NextScript />
					</Theme>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
