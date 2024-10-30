import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import AppbarClient from "./components/AppbarClient";

export const metadata: Metadata = {
  title: "Pay Current",
  description: "Simple PayTM app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <AppbarClient /> 
          {children} 
        </body> 
      </Providers>
    </html>
  );
}
