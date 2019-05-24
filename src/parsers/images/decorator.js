import React from 'react'

const imageDecorator = decoratedURL => {
  return (
    <img
      src={decoratedURL}
      rel='noopener'
      className='rtfImage'
      alt={decoratedURL}
    />
  )
}

export default imageDecorator
