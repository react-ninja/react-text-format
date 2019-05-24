import React from 'react';
/**
 * creditCardDecorator is used for credit card decorator
 * @param  {string} decoratedText contains the credit card number which needs to be formatted
 * @return {react.node}
 */
const creditCardDecorator = decoratedText => {
  return <span className='rtfCreditCard'>{decoratedText}</span>
}

export default creditCardDecorator;
