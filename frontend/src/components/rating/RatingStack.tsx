import { Chip, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Rating } from '../../types/Rating'
import { ArrowForward, ArrowUpward } from '@mui/icons-material'
import RatingChip from './RatingChip'



interface options {
    withArrow?: boolean
}

interface RatingStack {
    data?: Rating | null
    context?: Rating | null
    options?: options
}

const RatingStack = ( { data, context, options: inputOptions }: RatingStack ) => {

    const theme = useTheme()

    const options: options = {
        withArrow: true,
        ...inputOptions,
    }

    const getRotation = ( label: keyof Rating ) => {
        if ( !context || !data ) {
            return 0
        }
        const activeRating = data[label] // 80
        const contextRating = context[label] // 60

        const percentage = contextRating / activeRating
        return ( percentage * 450 )

    }

    const getColor = ( rating: number ): 'default' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | 'warning' => {
        const breakpoints = [ 25, 50, 85 ]
        if ( rating < breakpoints[0] )
            return 'error'
        if ( rating < breakpoints[1] )
            return 'warning'
        if ( rating < breakpoints[2] )
            return 'info'

        return 'success'
    }
    if ( !data ) {

        return (
          <Stack direction={'row'} spacing={1} sx={{ opacity: .5 }}>
              <Chip label={`P:00`}/>
              <Chip label={`S:00`}/>
              <Chip label={`A:00`}/>
          </Stack>
        )
    }

    // if ( options.withArrow ) {
    //     return (
    //       <Stack direction={'row'} spacing={1} sx={{ opacity: .5 }}>
    //           <Paper sx={{ px: 1.5, py: .5, borderRadius: theme.spacing( 4 ), backgroundColor: `${getColor( data.performance )}.main` }} elevation={1}>
    //               <Stack alignItems={'center'} direction={'row'}>
    //                   <Typography mb={0} variant={'caption'}>P:{data.performance}</Typography>
    //                   <ArrowUpward sx={{ opacity: .5, transform: `rotate(${getRotation( 'performance' )}deg)` }}/>
    //               </Stack>
    //           </Paper>
    //           <Paper sx={{ px: 1.5, py: .5, borderRadius: theme.spacing( 4 ), backgroundColor: `${getColor( data.seo )}.main` }} elevation={1}>
    //               <Stack alignItems={'center'} direction={'row'}>
    //                   <Typography mb={0} variant={'caption'}>S:{data.seo}</Typography>
    //                   <ArrowUpward sx={{ opacity: .5, transform: `rotate(${getRotation( 'seo' )}deg)` }}/>
    //               </Stack>
    //           </Paper>
    //           <Paper sx={{ px: 1.5, py: .5, borderRadius: theme.spacing( 4 ), backgroundColor: `${getColor( data.accessibility )}.main` }} elevation={1}>
    //               <Stack alignItems={'center'} direction={'row'}>
    //                   <Typography mb={0} variant={'caption'}>A:{data.accessibility}</Typography>
    //                   <ArrowUpward sx={{ opacity: .5, transform: `rotate(${getRotation( 'accessibility' )}deg)` }}/>
    //               </Stack>
    //           </Paper>
    //       </Stack>
    //     )
    // }

    return ( <Stack direction={'row'} spacing={1}>
        <RatingChip label={'performance'} rating={data.performance}/>
        <RatingChip label={'seo'} rating={data.seo}/>
        <RatingChip label={'accessibility'} rating={data.accessibility}/>
    </Stack> )
}
export default RatingStack