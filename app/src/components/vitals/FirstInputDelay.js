import {Paper, Typography} from '@mui/material'
import Slide from '../charts/Slide'
import Vital from './Vital'

const FirstInputDelay = ({data}) => {

  const {good, improvement, poor} = data

  const base = (good + 1) * (improvement + 1) * (poor + 1)
  const average = Math.pow(base, 1 / 3)

  console.log('AVERAGE :', average)

  return (<Vital>
    <Typography variant={'h5'}>First Input Delay (FID)</Typography>
    <Slide good={good} improvements={improvement} poor={poor}/>
  </Vital>)
}
export default FirstInputDelay