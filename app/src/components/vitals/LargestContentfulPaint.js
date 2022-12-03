import {Typography} from '@mui/material'
import Slide from '../charts/Slide'
import Vital from './Vital'

const LargestContentfulPaint = ({data}) => {
  const {good, improvement, poor} = data

  return (<Vital>
    <Typography variant={'h5'}>Largest Contentful Paint (LCP)</Typography>
    <Slide good={good} improvements={improvement} poor={poor}/>
  </Vital>)
}

export default LargestContentfulPaint