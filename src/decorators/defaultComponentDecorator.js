import React, { Fragment } from 'react'

export const decoratorWrapper = (decorator, key) => {
  return <Fragment key={key}>{decorator}</Fragment>
}

export const linkDecorator = (
  decoratedHref: string,
  decoratedText: string,
  linkTarget: string,
): React.Node => {
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

export const imageDecorator = (
  decoratedURL: string,
): React.Node => {
  return (
    <img
      src={decoratedURL}
      rel='noopener'
      className='rtfImage'
      alt={decoratedURL}
    />
  )
}

export const emailDecorator = (
  decoratedHref: string,
  decoratedText: string,
): React.Node => {
  return (
    <a href={decoratedHref} className='rtfEmail'>
      {decoratedText}
    </a>
  )
}

export const phoneDecorator = (
  decoratedText: string,
): React.Node => {
  return (
    <a href={`tel:${decoratedText}`} className='rtfPhone'>
      {decoratedText}
    </a>
  )
}

export const creditCardDecorator = (
  decoratedText: string,
): React.Node => {
  return (
    <span className='rtfCreditCard'>
      {decoratedText}
    </span>
  )
}

export const termDecorator = (
  decoratedText: string,
): React.Node => {
  return <span className='rtfTerm'>{decoratedText}</span>
}
