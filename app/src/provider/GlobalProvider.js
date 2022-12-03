import DomainProvider from './DomainListProvider'
import {ThemeProvider} from '@mui/material'
import theme from '../lib/theme'
import RecentPagesProvider from './RecentPagesProvider'
import {BrowserRouter} from 'react-router-dom'
import AddDomainProvider from './AddDomainProvider'

const GlobalProvider = ({children}) => {
  return (<BrowserRouter>

    <DomainProvider>
      <AddDomainProvider>
        <RecentPagesProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </RecentPagesProvider>
      </AddDomainProvider>
    </DomainProvider>
  </BrowserRouter>)
}

export default GlobalProvider