import styled from '@emotion/styled'
import MuiInputBase from '@mui/material/InputBase'
import {Box, Typography, useTheme} from '@mui/material'

const InputBase = styled(MuiInputBase)(({theme}) => ({
  border: `1px solid ${theme.palette.mode === 'dark' ?
      theme.palette.grey['800'] :
      theme.palette.grey['300']}`,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  width: '100%',
  ':focus-within': {
    borderColor: theme.palette.primary.main + '!important',
  },
}))

const CustomInput = ({...props}) => {

  const {error} = props
  const theme = useTheme()

  console.log('ERROR :', props.error, props)
  if (error) {

  }
  return <Box sx={{width: '100%', position: 'relative'}}>
    <Box sx={{position: 'absolute', top: theme.spacing(-2.75)}}><Typography
        variant={'overline'}
        sx={{fontSize: '.6em'}}
        color={'error'}>{error}</Typography>
    </Box>
    <InputBase {...props} sx={{
      borderColor: error ? theme.palette.error.main + '!important' : 'inherit',
    }}/>
  </Box>

}
export default CustomInput