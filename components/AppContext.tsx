"use client";

import "@fontsource/poppins";
import "@fontsource/poppins/400.css"; 

import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

export default function AppContextProvider(props: { children: any }) {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {defaultMatches : true, noSsr : true});

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Poppins'
            ].join(','),
        },
        palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary: {
                main: '#ffffff',
                dark: '#008000',
                light: '#000000'
            },
            secondary: {
                main: '#000000',
                dark: '#000000',
                light: '#ffffff'
            },
        },
        components: {
            MuiInputBase: {
                defaultProps: {
                    sx: {
                        borderRadius: 2
                    }
                }
            },
            MuiTextField: {
                defaultProps: {
                    variant: "outlined"
                }
            },
            MuiLink : {
                defaultProps : {
                    color: "inherit",
                    underline : "hover"
                }
            },
            MuiButton : {
                defaultProps : {
                    variant : "outlined",
                    sx: {
                        color: "white",
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                    }
                }
            },
            MuiButtonBase: {
                defaultProps : {
                    disableRipple: true
                }
            },
            MuiAvatar : {
                defaultProps : {
                    sx : {
                        borderRadius : 2
                    },
                    variant: "square"
                }
            },
            MuiCard : {
                defaultProps : {
                    variant: "outlined",
                    sx: {
                        borderRadius: 2
                    }
                }
            },
            MuiSelect : {
                defaultProps : {
                    MenuProps: {
                        slotProps: {
                            paper: {
                                elevation : 0,
                                variant : "outlined",
                                sx: {
                                    borderRadius : "12px"
                                }
                            }
                        }
                    }
                }
            },
            MuiAppBar : {
                defaultProps : {
                    sx: {
                        fontSize: "12px"
                    },
                    elevation : 0,
                }
            },
            MuiChip : {
                defaultProps : {
                    sx : {
                        fontWeight: 500,
                    }
                }
            },
            MuiDialog : {
                defaultProps : {
                    PaperProps : {
                        elevation : 0,
                        variant : "outlined"
                    }
                }
            },
            MuiCircularProgress : {
                defaultProps : {
                    color: 'primary'
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {props.children}
        </ThemeProvider>
    );
}