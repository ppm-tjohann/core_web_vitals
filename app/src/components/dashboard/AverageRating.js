import {useContext} from 'react'
import {DomainListContext} from '../../provider/DomainListProvider'
import SmallDashboardCard from './sizes/SmallDashboardCard'
import {ucFirst} from '../../lib/helpers'
import {useTheme} from '@mui/material'

const getAverage = (domains, label) => {
  const sum = domains.reduce((prev, curr) => (curr[`average_${label}`] + prev),
                             0) * 100
  console.log('SUM AVG:', sum)

  return (Math.floor(sum / domains.length))
}

const AverageRating = ({label}) => {
  const {domains, loading} = useContext(DomainListContext)

  const theme = useTheme()
  const avg = getAverage(domains, label)

  const getColor = () => {
    switch (true) {
      case avg < 5:
        return theme.palette.error.dark
      case avg < 15:
        return theme.palette.error.main
      case avg < 20:
        return theme.palette.error.light
      case avg < 30:
        return theme.palette.warning.dark
      case avg < 45:
        return theme.palette.warning.main
      case avg < 60:
        return theme.palette.warning.light
      case avg < 70:
        return theme.palette.success.light
      case avg <= 80:
        return theme.palette.success.main
      case avg > 80:
        return theme.palette.success.dark

    }
  }

  return <SmallDashboardCard loading={loading} primary={avg}
                             sx={{
                               transition: 'background 2s ease-in-out',
                               background: getColor(),
                             }}
                             secondary={`Average ${ucFirst(label)} Rating`}/>
}
export default AverageRating