import {Avatar} from '@mui/material'

const Favicon = ({domain}) => {

  const domainShort = domain.name.replace('https://www.', '').substr(0, 2)

  return (<Avatar sx={{width: 32, height: 32}} src={domain.favicon}
                  variant={'circular'}>{domainShort}
  </Avatar>)
}
export default Favicon