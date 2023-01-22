import { Domain } from '../../../interfaces/DomainInterface'
import { Chip, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import Favicon from '../Favicon'
import { ArrowRight, Pages } from '@mui/icons-material'
import DomainActions from './DomainActions'
import { useRouter } from 'next/router'
import moment from 'moment'
import AverageRatings from '../../Ratings/AverageRatings'
import Divider from '@mui/material/Divider'
import { DomainListOptions } from './index'



interface DomainListItemProps {
    domain: Domain
    options: DomainListOptions
}

const DomainListItem = ( { domain, options }: DomainListItemProps ) => {

    const router = useRouter()

    const handleClick = () => {
        console.log( 'Click on', domain.name, domain.id )
        router.push( `domains/${domain.id}` )
    }

    return (
      <ListItem onClick={handleClick}>
          <ListItemButton>
              <ListItemIcon>
                  <Favicon {...domain}/>
              </ListItemIcon>
              <ListItemText primary={domain.name} secondary={domain.url}/>
              <Stack spacing={1} alignItems={'center'} direction={'row'} justifyContent={'flex-end'}
                     divider={options.hasDivider ? <Divider flexItem orientation={'vertical'}/> : null}>
                  {options.displayAverage && <AverageRatings variant={options.averageVariant} rating={domain.rating}/>}
                  {options.displayUpdate && <Chip label={`Last Update: ${moment( domain.updated_at ).fromNow()}`}/>}
                  {options.displayPagesCount && <Chip label={`Pages: ${domain.pages_count}`}/>}
                  {options.displaySitemap && <Chip label={'Sitemap'} color={domain.sitemapFound ? 'success' : 'error'}/>}
                  {options.displayActions && <DomainActions domain={domain}/>}
                  <IconButton>
                      <ArrowRight/>
                  </IconButton>
              </Stack>
          </ListItemButton>
      </ListItem>
    )
}
export default DomainListItem