// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        {/*<script*/}
        {/*  src="https://cdn.metricalp.com/event/metricalp.js"*/}
        {/*  data-tid="mam6"*/}
        {/*  defer*/}
        {/*></script>*/}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/*<Script*/}
        {/*  src="https://cdn.metricalp.com/event/metricalp.js"*/}
        {/*  data-tid="mam6"*/}
        {/*  defer*/}
        {/*  onError={() => console.error("error")}*/}
        {/*  onReady={() => console.log("true")}*/}
        {/*/>*/}
      </body>
    </Html>
  );
}
