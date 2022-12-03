import {Paper, Slider, Typography} from '@mui/material'
import Slide from '../charts/Slide'
import Vital from './Vital'

const FirstContentfulPaint = ({data}) => {
  const {good, improvement, poor} = data

  return (<Vital>
    <Typography variant={'h5'}>First Contentful Paint (FCP)</Typography>
    <Slide good={good} improvements={improvement} poor={poor}/>
  </Vital>)
}
export default FirstContentfulPaint