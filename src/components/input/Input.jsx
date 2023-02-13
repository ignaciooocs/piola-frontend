import React from 'react'
import './Input.css'

const Input = React.forwardRef(({ ...props }, ref) => {
  return (
    <input ref={ref} className='Input' {...props} />
  )
})

export default Input
