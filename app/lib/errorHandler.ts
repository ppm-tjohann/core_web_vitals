import { ZodError } from 'zod'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'



const errorHandler = ( e: any ): { errors?: any } => {
    if ( e instanceof ZodError ) {
        console.log( 'ZodError : ', e.issues )
        let errors = {}
        e.issues.forEach( error => {
            console.log( 'Error validation :', error.path )
            errors = {
                ...errors,
                [error.path[0]]: error.message,
            }
        } )
        return ( { errors } )
    }
    if ( e instanceof AxiosError ) {
        if ( e.response ) {
            const { status, data } = e.response
            let errors = {}
            Object.keys( data.errors ).forEach( ( key ) => {
                console.log( 'Object Error key :', key )
                errors = {
                    ...errors,
                    [key]: data.errors[key][0],
                }
            } )
            console.log( 'Error Data :', data.errors, errors )
            return { errors }
        }
    }
    return {}

}
export default errorHandler