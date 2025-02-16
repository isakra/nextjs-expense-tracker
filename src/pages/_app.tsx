import "../styles/globals.css";
import type { AppProps } from "next/app";  // ✅ Fix Type

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
