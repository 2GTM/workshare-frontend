import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AppContextProvider from "@/components/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkShare",
  description: "Collaborate with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
        </nav>

        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
