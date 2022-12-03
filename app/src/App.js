import {CssBaseline} from '@mui/material'
import {createBrowserRouter, Route, RouterProvider} from 'react-router-dom'

import Sidebar from './components/global/Sidebar'
import Content from './components/global/Content'
import Dashboard from './pages/Dashboard'
import GlobalProvider from './provider/GlobalProvider'
import DomainListPage from './pages/DomainList'
import {Routes} from 'react-router'
import {Domain} from '@mui/icons-material'
import DomainView from './pages/DomainView'

const App = () => {

  return (<GlobalProvider>
    <CssBaseline/>
    <Sidebar/>
    <Content>
      <Routes>
        <Route path={'/'} element={<Dashboard/>}/>
        <Route path={'/domains'} element={<DomainListPage/>}/>
        <Route path={'/domains/:id'} element={<DomainView/>}/>
      </Routes>
    </Content>
  </GlobalProvider>)
}
export default App