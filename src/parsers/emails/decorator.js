import React from 'react';

const emailDecorator = (decoratedHref, decoratedText) => {
  return (
    <a href={decoratedHref} className='rtfEmail'>
      {decoratedText}
    </a>
  )
}
export default emailDecorator
