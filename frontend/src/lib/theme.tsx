import { createTheme, responsiveFontSizes } from '@mui/material'



let theme = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
            main: '#fe4c4f',
            dark: '#4b2c33',
        },
        success: {
            main: '#20ca5c',
        },
        info: {
            main: '#777afd',
        },
        background: {
            default: '#15161c',
            paper: '#212329',
        },
    },
    typography: {
        fontFamily: 'Poppins',
    },
} )

theme = createTheme( theme, {
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
        },

        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl',
            },
        },

        MuiGrid: {
            defualtProps: {
                spacing: 2,
            },
        },

        MuiStack: {
            defaultProps: {
                spacing: 2,
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: theme.spacing( 1 ),
                    padding: theme.spacing( 4 ),
                },
            },
        },
    },

} )

theme = responsiveFontSizes( theme )
export default theme