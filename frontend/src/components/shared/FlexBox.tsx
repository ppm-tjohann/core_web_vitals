import { ReactNode } from 'react'
import { Box } from '@mui/material'



interface FlexBox {
    children: ReactNode

    [x: string]: any
}

const FlexBox = ( { children, ...props }: FlexBox ) => {
    return (
      <Box {...props} sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', ...props.sx,
      }}>
          {children}
      </Box>
    )
}
export default FlexBox