import React from 'react'
/**
 * imageDecorator is the default decorator which is being used for the
 * formatting of image in content
 * @param  {string} decoratedURL url of image
 * @return {react.node}              
 */
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
