import * as React from 'react'
import map from 'lodash/map'
import includes from 'lodash/includes'
import hasIn from 'lodash/hasIn'
import random from 'lodash/random'
import defaultMatchDecorator, {
  ENTITY
} from '../decorators/defaultMatchDecorator'
import {
  linkDecorator,
  emailDecorator,
  phoneDecorator,
  creditCardDecorator,
  imageDecorator,
  termDecorator
} from '../decorators/defaultComponentDecorator'


class ReactFormatter extends React.Component<Props, {}> {
  static defaultProps = {
    allowedFormats: ['URL', 'Phone', 'Email', 'Terms'],
    terms: [],
    linkDecorator,
    emailDecorator,
    phoneDecorator,
    creditCardDecorator,
    imageDecorator,
    termDecorator,
    linkTarget: '_self'
  }

  parseString(string: string) {
    try {
      if (string === '') {
        throw null
      }
      const {
        terms,
        allowedFormats,
        linkDecorator,
        imageDecorator,
        creditCardDecorator,
        phoneDecorator,
        termDecorator,
        emailDecorator
      } = this.props
      string = decodeURIComponent(string)
      const matches = defaultMatchDecorator(string, terms)
      if (matches && matches.content && matches.content.length > 0) {
        const elements = map(matches.content, (content, i) => {
          if (includes(content, 'SHORTCODE:')) {
            const shortcode = content.replace('SHORTCODE:', '').split(' ')
            const shortcodeType = shortcode[0]
            const index = parseInt(shortcode[1].replace('key=', ''))
            const key = `${i}${random(1, 1000000)}`
            switch (shortcodeType) {
              case ENTITY.URL:
                if (hasIn(matches, ['urls', index, 'url'])) {
                  return includes(allowedFormats, ENTITY.URL)
                    ? linkDecorator(
                      matches.urls[index].url,
                      matches.urls[index].title,
                      this.props.linkTarget,
                      key
                    )
                    : matches.urls[index].title
                }
                return
              case ENTITY.IMAGE:
                if (
                  hasIn(matches, ['images', index, 'url']) &&
                  includes(allowedFormats, ENTITY.IMAGE)
                ) {
                  return imageDecorator(matches.images[index].url, key)
                }
                if (hasIn(matches, ['images', index, 'title'])) {
                  return matches.images[index].title
                }
              case ENTITY.CC:
                if (hasIn(matches, ['cc', index])) {
                  return includes(allowedFormats, ENTITY.CC)
                    ? creditCardDecorator(matches.cc[index], key)
                    : matches.cc[index]
                }
                return
              case ENTITY.PHONE:
                if (hasIn(matches, ['phone', index])) {
                  return includes(allowedFormats, ENTITY.PHONE)
                    ? phoneDecorator(matches.phone[index], key)
                    : matches.phone[index]
                }
                return
              case ENTITY.TERM:
                if (hasIn(matches, ['terms', index])) {
                  if (includes(allowedFormats, ENTITY.TERM)) {
                    return termDecorator(matches.terms[index], key)
                  } else {
                    return matches.terms[index]
                  }
                }
                return
              case ENTITY.EMAIL:
                const emailData = matches.email[index]
                if (hasIn(matches, ['email', index])) {
                  return includes(allowedFormats, ENTITY.EMAIL)
                    ? emailDecorator(emailData.url, emailData.title, key)
                    : emailData.title
                }
                return
              default:
                return content
            }
          }
          return content
        })
        return elements
      }
      throw null
    } catch (e) {
      return string
    }
  }

  parse(children: any, key: number = 0) {
    if (typeof children === 'string') {
      return this.parseString(children)
    } else if (
      React.isValidElement(children) &&
      children.type !== 'a' &&
      children.type !== 'button'
    ) {
      return React.cloneElement(
        children,
        { key: random(1, 1000000) },
        this.parse(children.props.children)
      )
    } else if (Array.isArray(children)) {
      return children.map((child, i) => this.parse(child, i))
    }

    return children
  }

  render(): React.Node {
    return <React.Fragment>{this.parse(this.props.children)}</React.Fragment>
  }
}

export default ReactFormatter
