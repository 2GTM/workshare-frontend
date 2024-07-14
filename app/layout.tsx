import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "@/components/AppContext";
import { AppBar, Container, Stack, Toolbar, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

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
				<AppContextProvider>
					<AppBar position="static" color="transparent">
						<Container maxWidth={false}>
							<Toolbar>
								<Stack spacing={3} direction="row">
									<MuiLink component={Link} href="/">Home</MuiLink>
									<MuiLink component={Link} href="/about">About</MuiLink>
									<MuiLink component={Link} href="/projects/search">Search Projects</MuiLink>
									<MuiLink component={Link} href="/projects/trend">Trending</MuiLink>
								</Stack>
							</Toolbar>
						</Container>
					</AppBar>
					<br /><br />
					<Toaster
						toastOptions={{
							style: {
								background: "#121212",
								color: "white",
								border: "1px solid #373737"
							}
						}} 
						position="bottom-center" />
					{children}
				</AppContextProvider>
			</body>
		</html>
	);
}
