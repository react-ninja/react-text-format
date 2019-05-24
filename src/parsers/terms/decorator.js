import React from 'react';
/**
 * termDecorator  is the default decorator which is being used for the
 * formatting of extracted terms
 * @param  {sring} decoratedText term's text.
 * @return {react.node}
 */
const termDecorator = decoratedText => {
  return <span className='rtfTerm'>{decoratedText}</span>
}

export default termDecorator
