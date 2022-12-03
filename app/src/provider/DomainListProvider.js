import {createContext, useEffect, useState} from 'react'
import {DUMMY_DOMAIN_LIST} from '../faker/fakerDomains'
import Domain from '../lib/api/Domain'

export const DomainListContext = createContext({})

const DomainProvider = ({children}) => {

  const [loading, setLoading] = useState(false)
  const [domains, setDomains] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    setLoading(true)
    const {data: domains} = await Domain.fetchDomainList()
    setDomains(domains)
    setLoading(false)
  }

  const handleRatingRefresh = async () => {
    setLoading(true)
    await Domain.refreshRatings()
    fetchData()
  }

  const handleAddDomain = (domain) => {
    setDomains([...domains, domain])
  }

  return (<DomainListContext.Provider
      value={{domains, loading, handleRatingRefresh, handleAddDomain}}>
    {children}
  </DomainListContext.Provider>)
}
export default DomainProvider