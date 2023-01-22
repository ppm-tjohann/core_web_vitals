import { Avatar } from '@mui/material'



interface FaviconProps {
    favicon?: string | undefined,
    src?: string | undefined,
    name: string,
    size?: number,
}

const Favicon = ( { size = 20, favicon, src, name }: FaviconProps ) => {
    return (
      <Avatar sx={{
          height: size, width: size,
      }} src={src ?? favicon}>{name}</Avatar>
    )
}
export default Favicon