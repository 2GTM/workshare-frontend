import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body>
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
        </nav>
      </body>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
