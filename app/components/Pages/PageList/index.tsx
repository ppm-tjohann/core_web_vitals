import { Page } from '../../../interfaces/PageInterface'
import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import { Domain } from '../../../interfaces/DomainInterface'
import Ratings from '../../Ratings'
import moment from 'moment'



interface PageListProps {
    pages: Page[]
    domain: Domain,
}

const PageList = ( { pages, domain }: PageListProps ) => {

    console.log( 'Pages :', pages )

    pages = pages.filter( page => page.ratings && page.ratings.length > 0 )

    const getPageName = ( page: Page ) => {

        const name = page.url.replace( domain.url, '' )
        if ( name === '' ) {
            return '/'
        }
        return name
    }

    return (
      <Paper>
          {pages.length === 0 ? <Typography variant={'h5'} component={'p'} textAlign={'center'}>No pages rated yet, please come back later</Typography> :
            <List>
                {pages.map( page => (

                  <ListItem>
                      <ListItemButton>
                          <ListItemText primary={getPageName( page )} secondary={moment( page.updated_at ).fromNow()}/>
                          {page.ratings && page.ratings.length > 0 && <Ratings data={page.ratings[0]}/>}
                      </ListItemButton>

                  </ListItem>
                ) )}
            </List>}
      </Paper>
    )

}
export default PageList