import {useContext, useEffect, useState} from 'react'
import {DomainListContext} from '../../provider/DomainListProvider'
import SmallDashboardCard from './sizes/SmallDashboardCard'
import Page from '../../lib/api/Page'

const NumberOfPages = () => {

  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  const {domains} = useContext(DomainListContext)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const newCount = await Page.fetchCount()
      setCount(newCount)
      setLoading(false)
    }
    if (domains.length !== 0 || count !== 0) {
      fetchData()
    }
  }, [domains])

  return <SmallDashboardCard secondary={'Found Pages'} primary={count}
                             loading={loading}/>

}
export default NumberOfPages