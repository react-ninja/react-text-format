import * as React from 'react'
import _ from 'lodash'
import defaultMatchDecorator, {
  ENTITY
} from '../decorators/defaultMatchDecorator'
import {
  LinkDecorator,
  EmailDecorator,
  PhoneDecorator,
  CreditCardDecorator,
  ImageDecorator
} from '../decorators/defaultComponentDecorator'

type Props = {
  children: React.Node,
  componentDecorator: (string, string, number) => React.Node,
  matchDecorator: (string) => Array<Object>
}

class ReactFormatter extends React.Component<Props, {}> {
  static defaultProps = {
    allowedFormats: ['URL', 'Phone', 'Email'],
    LinkDecorator,
    EmailDecorator,
    PhoneDecorator,
    CreditCardDecorator,
    ImageDecorator,
    matchDecorator: defaultMatchDecorator,
    linkTarget: '_self'
  }

  parseString(string: string) {
    if (string === '') {
      return string
    }
    let matches = defaultMatchDecorator(string)
    if (matches && matches.content && matches.content.length > 0) {
      const elements = _.map(matches.content, (content, i) => {
        if (_.includes(content, 'SHORTCODE:')) {
          const shortcode = content.replace('SHORTCODE:', '').split(' ')
          const shortcodeType = shortcode[0]
          const index = parseInt(shortcode[1].replace('key=', ''))
          switch (shortcodeType) {
            case ENTITY.URL:
              const urlData = matches.urls[index]
              if (_.includes(this.props.allowedFormats, ENTITY.URL)) {
                return this.props.LinkDecorator(
                  urlData.url,
                  urlData.title,
                  this.props.linkTarget,
                  i
                )
              }
              return urlData.title
            case ENTITY.IMAGE:
              const imageData = matches.images[index];
              if (_.includes(this.props.allowedFormats, ENTITY.IMAGE)) {
                return this.props.ImageDecorator(
                  imageData.url,
                  i
                )
              }
              return imageData.title
            case ENTITY.CC:
              const ccData = matches.cc[index]
              if (_.includes(this.props.allowedFormats, ENTITY.CC)) {
                return this.props.CreditCardDecorator(ccData, i)
              }
              return ccData
            case ENTITY.PHONE:
              const phoneData = matches.phone[index]
              if (_.includes(this.props.allowedFormats, ENTITY.PHONE)) {
                return this.props.PhoneDecorator(phoneData, i)
              }
              return phoneData
            case ENTITY.EMAIL:
              const emailData = matches.email[index]
              if (_.includes(this.props.allowedFormats, ENTITY.EMAIL)) {
                return this.props.EmailDecorator(
                  emailData.url,
                  emailData.title,
                  i
                )
              }
              return emailData.title
            default:
              return content
          }
        }
        return content
      })
      return elements
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
        { key: key },
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
