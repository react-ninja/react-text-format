import * as React from 'react'
import map from 'lodash/map'
import includes from 'lodash/includes'
import hasIn from 'lodash/hasIn'
import random from 'lodash/random'
import defaultMatchDecorator, {
  ENTITY
} from '../decorators/defaultMatchDecorator'
import {
  LinkDecorator,
  EmailDecorator,
  PhoneDecorator,
  CreditCardDecorator,
  ImageDecorator,
  TermDecorator
} from '../decorators/defaultComponentDecorator'

type Props = {
  children: React.Node,
  componentDecorator: (string, string, number) => React.Node,
  matchDecorator: string => Array<Object>
}

class ReactFormatter extends React.Component<Props, {}> {
  static defaultProps = {
    allowedFormats: ['URL', 'Phone', 'Email', 'Terms'],
    Terms: [],
    LinkDecorator,
    EmailDecorator,
    PhoneDecorator,
    CreditCardDecorator,
    ImageDecorator,
    TermDecorator,
    matchDecorator: defaultMatchDecorator,
    linkTarget: '_self'
  }

  parseString(string: string) {
    try {
      if (string === '') {
        throw null
      }
      string = decodeURIComponent(string)
      const matches = defaultMatchDecorator(string, this.props.Terms)
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
                  return includes(this.props.allowedFormats, ENTITY.URL)
                    ? this.props.LinkDecorator(
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
                  includes(this.props.allowedFormats, ENTITY.IMAGE)
                ) {
                  return this.props.ImageDecorator(
                    matches.images[index].url,
                    key
                  )
                }
                if (hasIn(matches, ['images', index, 'title'])) {
                  return matches.images[index].title
                }
              case ENTITY.CC:
                if (hasIn(matches, ['cc', index])) {
                  return includes(this.props.allowedFormats, ENTITY.CC)
                    ? this.props.CreditCardDecorator(matches.cc[index], key)
                    : matches.cc[index]
                }
                return
              case ENTITY.PHONE:
                if (hasIn(matches, ['phone', index])) {
                  return includes(this.props.allowedFormats, ENTITY.PHONE)
                    ? this.props.PhoneDecorator(matches.phone[index], key)
                    : matches.phone[index]
                }
                return
              case ENTITY.TERM:
                if (hasIn(matches, ['terms', index])) {
                  if (includes(this.props.allowedFormats, ENTITY.TERM)) {
                    return this.props.TermDecorator(matches.terms[index], key)
                  } else {
                    return matches.terms[index]
                  }
                }
                return
              case ENTITY.EMAIL:
                const emailData = matches.email[index]
                if (hasIn(matches, ['email', index])) {
                  return includes(this.props.allowedFormats, ENTITY.EMAIL)
                    ? this.props.EmailDecorator(
                      emailData.url,
                      emailData.title,
                      key
                    )
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
