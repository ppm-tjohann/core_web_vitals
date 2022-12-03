import MediumDashboardCard from './sizes/MediumDashboardCard'
import {useContext} from 'react'
import {DomainListContext} from '../../provider/DomainListProvider'
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {Check, ChevronRight, Close, Refresh} from '@mui/icons-material'
import RatingChip from '../shared/RatingChip'
import Favicon from '../shared/Favicon'
import {useNavigate} from 'react-router'
import CardHeader from '../shared/CardHeader'

const DomainListHead = () => (<TableHead>
  <TableRow>
    <TableCell/>
    <TableCell>Name</TableCell>
    <TableCell>Sitemap</TableCell>
    <TableCell>Pages</TableCell>
    <TableCell>PERF</TableCell>
    <TableCell>SEO</TableCell>
    <TableCell>ACC</TableCell>
    <TableCell/>
  </TableRow>
</TableHead>)

const DomainList = ({size = 6, showHeader = false}) => {

  const {loading, domains, handleRatingRefresh} = useContext(DomainListContext)
  const navigate = useNavigate()

  const handleDomainListClick = () => {
    navigate('/domains')
  }

  const handleDomainClick = id => event => {
    navigate(`/domains/${id}`)
  }

  console.log('DOMAINS :', domains)
  return (<MediumDashboardCard loading={loading} size={size}>
    {showHeader && <CardHeader>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <IconButton sx={{mr: 1}}><Refresh/></IconButton>
        <Typography variant={'h5'}>Domain-List</Typography>
      </Box>
      <IconButton onClick={handleDomainListClick}>
        <ChevronRight/>
      </IconButton>
    </CardHeader>}
    <Table sx={{width: '100%'}}>
      <DomainListHead/>
      <TableBody>
        {domains.map(domain => (<TableRow hover key={domain.id}
                                          onClick={handleDomainClick(
                                              domain.id)}>
          <TableCell width={50}>
            <Favicon domain={domain}/>
          </TableCell>
          <TableCell>{domain.name}</TableCell>
          <TableCell size={'small'} width={50}
                     align={'center'}>{domain.sitemapFound === 1 ?
              <Check color={'success'}/> :
              <Close color={'error'}/>}</TableCell>
          <TableCell width={50}>{domain.pages_count || '-'}</TableCell>
          <TableCell>
            <RatingChip rating={domain.average_performance}/>
          </TableCell>
          <TableCell>
            <RatingChip rating={domain.average_seo}/>
          </TableCell>
          <TableCell>
            <RatingChip rating={domain.average_accessibility}/>
          </TableCell>
          <TableCell>
            <IconButton><ChevronRight/></IconButton>
          </TableCell>
        </TableRow>))}
      </TableBody>
    </Table>
  </MediumDashboardCard>)
}
export default DomainList