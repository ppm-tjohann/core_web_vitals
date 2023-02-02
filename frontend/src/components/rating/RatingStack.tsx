import { Chip, Stack } from '@mui/material'



interface RatingStack {

}

const RatingStack = () => {
    return ( <Stack direction={'row'} spacing={1}>
        <Chip label={'P:50'} color={'info'}/>
        <Chip label={'S:75'} color={'success'}/>
        <Chip label={'A:90'} color={'warning'}/>
    </Stack> )
}
export default RatingStack