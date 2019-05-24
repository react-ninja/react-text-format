import React, { Fragment } from 'react'
import map from 'lodash/map'
import includes from 'lodash/includes'
import replace from 'lodash/replace'
import random from 'lodash/random'
import hasIn from 'lodash/hasIn'
import { ENTITY } from '../config'

const decoratorWrapper = (decorator, key) => {
  return <Fragment key={key}>{decorator}</Fragment>
}

/**
 * decorator finds the shortcodes from content (array) and replace them with
 * formatted react nodes.
 * @param  {array} matches array of extracted formats
 * @param  {json} args    contains all the props
 */
const decorator = (matches, args) => {
  const {
    allowedFormats,
    terms,
    linkDecorator,
    linkTarget,
    emailDecorator,
    phoneDecorator,
    creditCardDecorator,
    imageDecorator,
    termDecorator
  } = args
  if (matches && matches.content && matches.content.length > 0) {
    const elements = map(matches.content, (content, i) => {
      if (includes(content, 'SHORTCODE:')) {
        const shortcode = content.replace('SHORTCODE:', '').split(' ')
        const shortcodeType = shortcode[0]
        const index = parseInt(replace(shortcode[1], 'key=', ''))
        const key = `${i}${random(1, 1000000)}`
        switch (shortcodeType) {
          case ENTITY.URL:
            if (hasIn(matches, ['urls', index, 'url'])) {
              return decoratorWrapper(
                linkDecorator(
                  matches.urls[index].url,
                  matches.urls[index].title,
                  linkTarget
                ),
                key
              )
              return matches.urls[index].title
            }
            return
          case ENTITY.IMAGE:
            if (hasIn(matches, ['images', index, 'url'])) {
              return decoratorWrapper(
                imageDecorator(matches.images[index].url),
                key
              )
            }
            if (hasIn(matches, ['images', index, 'title'])) {
              return decoratorWrapper(matches.images[index].title, key)
            }
          case ENTITY.CC:
            if (hasIn(matches, ['cc', index])) {
              return decoratorWrapper(
                creditCardDecorator(matches.cc[index]),
                key
              )
            }
            return
          case ENTITY.PHONE:
            if (hasIn(matches, ['phone', index])) {
              return decoratorWrapper(phoneDecorator(matches.phone[index]), key)
            }
            return
          case ENTITY.TERM:
            if (hasIn(matches, ['terms', index])) {
              return decoratorWrapper(termDecorator(matches.terms[index]), key)
            }
            return
          case ENTITY.EMAIL:
            const emailData = matches.emails[index]
            if (hasIn(matches, ['emails', index])) {
              return decoratorWrapper(
                emailDecorator(emailData.url, emailData.title),
                key
              )
            }
            return
        }
      }
      return content
    })
    return elements
  }
}

export default decorator
