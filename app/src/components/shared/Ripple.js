import TouchRipple from '@mui/material/ButtonBase/TouchRipple'
import {useRef} from 'react'

const Ripple = ({children}) => {
  const rippleRef = useRef(null)
  const onRippleStart = (e) => {
    rippleRef.current.start(e)
  }
  const onRippleStop = (e) => {
    rippleRef.current.stop(e)
  }

  return (<div
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      style={{
        display: 'inline-block',
        padding: 8,
        position: 'relative',
        border: 'black solid 1px',
      }}
  >
    {children}
    <TouchRipple ref={rippleRef} center={false}/>
  </div>)
}
export default Ripple