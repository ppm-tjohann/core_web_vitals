import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '../lib/theme'
import UiMessagesProvider from '../components/UiMessages/UiMessagesProvider'
import Sidebar from '../components/Sidebar'



export default function App( { Component, pageProps }: AppProps ) {
    return ( <ThemeProvider theme={theme}>
        <UiMessagesProvider>
            <Sidebar>
                <>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </>
            </Sidebar>
        </UiMessagesProvider>
    </ThemeProvider> )
}
