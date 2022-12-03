import SmallDashboardCard from './sizes/SmallDashboardCard'
import {useContext} from 'react'
import {DomainListContext} from '../../provider/DomainListProvider'

const NumberOfDomainsCard = () => {

  const {domains, loading} = useContext(DomainListContext)
  const size = domains.length
  return (<SmallDashboardCard loading={loading} primary={size}
                              secondary={'Registered' + ' Domains'}/>)
}
export default NumberOfDomainsCard