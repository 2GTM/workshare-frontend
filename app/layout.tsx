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
								<Stack fontSize={20} spacing={5} direction="row">
									<MuiLink underline="none" component={Link} href="/">Home</MuiLink>
									<MuiLink underline="none" component={Link} href="/projects/search">Find a project</MuiLink>
									<MuiLink underline="none" component={Link} href="/projects/trend">Trending</MuiLink>
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
