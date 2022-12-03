import {createContext, useContext, useEffect, useState} from 'react'
import {DomainListContext, DUMMY_DOMAIN_LIST} from './DomainListProvider'
import {
  createRecentPageEntry, DUMMY_RECENT_PAGES_LIST,
} from '../faker/fakerRecentPages'

export const RecentPagesContext = createContext({})

const RecentPagesProvider = ({children}) => {

  const MAX_LIST_SIZE = 10
  const {handleDomainUpdate} = useContext(DomainListContext)

  const [pages, setPages] = useState(DUMMY_RECENT_PAGES_LIST)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const addingPage = setInterval(() => {
      const newPage = createRecentPageEntry()
      setPages([newPage, ...pages].slice(0, MAX_LIST_SIZE))
      handleDomainUpdate(newPage.domain, newPage.ratings)
    }, 60000)

    return () => clearInterval(addingPage)
  }, [pages])

  return (<RecentPagesContext.Provider value={{pages, loading, MAX_LIST_SIZE}}>
    {children}
  </RecentPagesContext.Provider>)
}
export default RecentPagesProvider