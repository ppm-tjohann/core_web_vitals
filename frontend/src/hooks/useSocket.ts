import { useEffect } from 'react'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'



declare global {
    interface Window {
        Echo: Echo
        Pusher: Pusher
    }
}

interface useSocket {
    channel: string
    event: string
    callBack: ( data: any ) => any
}

window.Pusher = require( 'pusher-js' )

const useSocket = ( { channel, event, callBack }: useSocket ) => {

    useEffect( () => {
        if ( !window.Echo ) {
            window.Echo = new Echo( {
                broadcaster: 'pusher',
                key: 'pusherAppKey',
                wsHost: window.location.hostname,
                wsPort: 6001,
                forceTLS: false,
                disableStats: true,
                cluster: 'mt1',
            } )
        }
        window.Echo.channel( channel ).stopListening( `.${event}` )
        window.Echo.channel( channel ).listen( `.${event}`, callBack )

    }, [] )

    return null
}

export default useSocket