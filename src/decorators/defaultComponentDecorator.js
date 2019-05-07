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

export const linkDecorator = (
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

export const imageDecorator = (
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

export const emailDecorator = (
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

export const phoneDecorator = (
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <a href={`tel:${decoratedText}`} key={key} className='rtfPhone'>
      {decoratedText}
    </a>
  )
}

export const creditCardDecorator = (
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <span key={key} className='rtfCreditCard'>
      {decoratedText}
    </span>
  )
}

export const termDecorator = (
  decoratedText: string,
  key: number
): React.Node => {
  return (
    <span key={key} className='rtfTerm'>
      {decoratedText}
    </span>
  )
}
