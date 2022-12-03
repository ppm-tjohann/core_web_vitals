import {Paper, Typography} from '@mui/material'
import Slide from '../charts/Slide'
import Vital from './Vital'

const CummulativeLayoutShift = ({data}) => {
  const {good, improvement, poor} = data

  return (<Vital>
    <Typography variant={'h5'}>Cummulative Layout Shift (CLS)</Typography>
    <Slide good={good} improvements={improvement} poor={poor}/>
  </Vital>)
}
export default CummulativeLayoutShift