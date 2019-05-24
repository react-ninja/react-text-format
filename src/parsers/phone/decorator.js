import React from 'react';

const phoneDecorator = decoratedText => {
  return (
    <a href={`tel:${decoratedText}`} className='rtfPhone'>
      {decoratedText}
    </a>
  )
}

export default phoneDecorator
