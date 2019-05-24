import React, { Fragment } from 'react'
import map from 'lodash/map'
import random from 'lodash/random'
import { ENTITY } from '../config'
import { logger } from '../utils/common'
import scrapper from '../parsers/scrapper'
import decorator from '../parsers/decorator'

import linkDecorator from '../parsers/urls/decorator'
import emailDecorator from '../parsers/emails/decorator'
import phoneDecorator from '../parsers/phone/decorator'
import creditCardDecorator from '../parsers/creditcards/decorator'
import imageDecorator from '../parsers/images/decorator'
import termDecorator from '../parsers/terms/decorator'

const ReactFormatter = props => {
  const { allowedFormats, terms, children } = props
  const parseString = string => {
    try {
      if (string === '') {
        throw null
      }
      const matches = scrapper(allowedFormats, string, terms)
      return decorator(matches, props)
      throw null
    } catch (e) {
      logger(e)
      return string
    }
  }
  const parse = (children, key = 0) => {
    if (typeof children === 'string') {
      return parseString(children)
    } else if (
      React.isValidElement(children) &&
      children.type !== 'a' &&
      children.type !== 'button'
    ) {
      return React.cloneElement(
        children,
        { key: random(1, 1000000) },
        parse(children.props.children)
      )
    } else if (Array.isArray(children)) {
      return children.map((child, i) => parse(child, i))
    }

    return children
  }
  return <React.Fragment>{parse(children)}</React.Fragment>
}

ReactFormatter.defaultProps = {
  allowedFormats: [ENTITY.URL, ENTITY.PHONE, ENTITY.EMAIL, ENTITY.TERM],
  terms: [],
  linkDecorator,
  emailDecorator,
  phoneDecorator,
  creditCardDecorator,
  imageDecorator,
  termDecorator,
  linkTarget: '_self'
}
export default ReactFormatter
