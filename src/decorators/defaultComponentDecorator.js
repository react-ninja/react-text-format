import * as React from 'react'

export default (
  decoratedHref: string,
  decoratedText: string,
  linkTarget: string,
  key: number
): React.Node => {
  return (
    <a href={decoratedHref} key={key} target={linkTarget} rel='noopener'>
      {decoratedText}
    </a>
  )
}

export const LinkDecorator = (
  decoratedHref: string,
  decoratedText: string,
  linkTarget: string,
  key: number
): React.Node => {
  return (
    <a
      href={decoratedHref}
      key={key}
      target={linkTarget}
      rel='noopener'
      className='rtfLink'
    >
      {decoratedText}
    </a>
  )
}

export const ImageDecorator = (
  decoratedURL: string,
  key: number
): React.Node => {
  return (
    <img
      src={decoratedURL}
      key={key}
      rel='noopener'
      className='rtfImage'
      alt={decoratedURL}
    />
  )
}

export const EmailDecorator = (
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <a href={decoratedHref} key={key} className='rtfEmail'>
      {decoratedText}
    </a>
  )
}

export const PhoneDecorator = (
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <a href={`tel:${decoratedText}`} key={key} className='rtfPhone'>
      {decoratedText}
    </a>
  )
}

export const CreditCardDecorator = (
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <span key={key} className='rtfCreditCard'>
      {decoratedText}
    </span>
  )
}
