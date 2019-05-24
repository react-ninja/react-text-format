import React from 'react';

const urlDecorator = (decoratedHref, decoratedText, linkTarget) => {
  return (
    <a
      href={decoratedHref}
      target={linkTarget}
      rel='noopener'
      className='rtfLink'
    >
      {decoratedText}
    </a>
  )
}

export default urlDecorator
