import {createTheme, responsiveFontSizes} from '@mui/material'

let theme = createTheme({
                          palette: {
                            mode: 'dark',
                          },
                        })

// DEFAULT PROPS
theme = createTheme(theme, {
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 6,
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme