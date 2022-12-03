import {clamp, getRatingColor} from '../../lib/helpers'
import {Box, Chip, IconButton} from '@mui/material'
import {KeyboardBackspace} from '@mui/icons-material'
import Button from '@mui/material/Button'
import {useEffect, useState} from 'react'
import AnimatedNumber from 'animated-number-react'

const RatingChip = ({rating, displayAverage = false, domain = null}) => {

  const [orientation, setOrientation] = useState(0)

  rating = rating < 1 ? rating * 100 : rating

  useEffect(() => {
    if (displayAverage) {
      setTimeout(() => getOrientation(), 1000)
    }
  }, [])

  const getOrientation = () => {
    let newOrientation = clamp((rating / domain) - 1, -1, 1)
    newOrientation *= 90
    setOrientation(newOrientation)
  }

  const color = getRatingColor(rating)

  if (!displayAverage) {
    return <Chip color={color}
                 label={Math.floor(rating) || '-'}
                 size={'small'}
                 sx={{width: '100%'}}/>
  }

  return (<Button color={color}
                  endIcon={<KeyboardBackspace
                      sx={{
                        transition: 'transform 500ms ease-in-out',
                        transform: `scaleX(-1) rotate(${orientation}deg)`,
                      }}/>}> {<AnimatedNumber value={rating}
                                              formatValue={value => value.toFixed(
                                                  2) || '-'}/>}</Button>)
}

export default RatingChip