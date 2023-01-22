import { createTheme } from '@mui/material'



let theme = createTheme( {
    palette: {
        mode: 'dark',
    },
} )

// DEFAULT STYLES
theme = createTheme( theme, {
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: theme.spacing( 3, 0 ),
                    marginTop: theme.spacing( 3 ),
                    marginBottom: theme.spacing( 3 ),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: theme.spacing( 3 ),
                },
            },
        },
    },
} )

// DEFAULT PROPS
theme = createTheme( theme, {
    components: {

        MuiGrid: {
            defaultProps: {
                spacing: 3,
            },
        },
        MuiStack: {
            defaultProps: {
                spacing: 3,
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'xl',
            },
        },
    },
} )

export default theme