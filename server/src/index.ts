import app from './app'
import test from './cron'



const port = process.env.PORT || 5000
app.listen( port, () => {
    /* eslint-disable no-console */
    console.log( `Listening: http://localhost:${port}` )
    test.start()
    /* eslint-enable no-console */
} )
