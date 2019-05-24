import React from 'react';
/**
 * phoneDecorator is the default decorator which is being used for the
 * formatting of phone numbers in content
 * @param  {string} decoratedText phone Number
 */
const phoneDecorator = decoratedText => {
  return (
    <a href={`tel:${decoratedText}`} className='rtfPhone'>
      {decoratedText}
    </a>
  )
}

export default phoneDecorator
