import React from 'react';
/**
 * emailDecorator is the default decorator which is being used for the
 * formatting of emails in content
 * @param  {string} decoratedHref contains the link of email like mailto:xyz@gmail.com
 * @param  {string} decoratedText contains the raw text of email
 * @return {react.node}
 */
const emailDecorator = (decoratedHref, decoratedText) => {
  return (
    <a href={decoratedHref} className='rtfEmail'>
      {decoratedText}
    </a>
  )
}
export default emailDecorator
