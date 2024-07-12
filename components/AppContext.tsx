"use client";

import { createTheme, ThemeProvider } from "@mui/material";

export default function AppContextProvider(props: { children: any }) {
    const theme = createTheme({
        palette: {

        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: "outlined"
                }
            },
            MuiButton: {
                defaultProps: {
                    variant: "contained"
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
}