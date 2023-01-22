import { Domain } from '../../../interfaces/DomainInterface'
import { Box, List, Paper } from '@mui/material'
import DomainListItem from './DomainListItem'
import { RatingVariants } from '../../Ratings/AverageRatings'



export interface DomainListOptions {
    displayActions?: boolean
    displayUpdate?: boolean
    displayAverage?: boolean
    averageVariant?: RatingVariants
    displayPagesCount?: boolean
    displaySitemap?: boolean
    hasDivider?: boolean

}

interface DomainListProps {
    domains: Domain[]
    options?: DomainListOptions
}

const DomainList = ( { domains, options }: DomainListProps ) => {

    const mergedOptions: DomainListOptions = {
        displayActions: true,
        displayAverage: true,
        displayUpdate: true,
        displayPagesCount: true,
        displaySitemap: true,
        averageVariant: 'medium',
        hasDivider: true,
        ...options,
    }

    return ( <Paper>
        <List>
            {domains.map( domain => <DomainListItem options={mergedOptions} domain={domain}/> )}
        </List>
    </Paper> )

}
export default DomainList