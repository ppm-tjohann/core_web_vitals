import { maxHeaderSize } from 'http'



export const clamp = ( num: number, min: number, max: number ) => {
    if ( num > max ) {
        return max
    }
    if ( num < min ) {
        return min
    }
    return num
}