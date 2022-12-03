import SmallDashboardCard from './sizes/SmallDashboardCard'
import {useEffect, useState} from 'react'
import Page from '../../lib/api/Page'

const ErrorPages = () => {

  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const pagesCount = await Page.fetchErrorCount()
      setPages(pagesCount)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (<SmallDashboardCard loading={loading} primary={pages}
                              secondary={'Error Pages'}/>)
}
export default ErrorPages