import LinkifyIt from 'linkify-it'
import compact from 'lodash/compact'
import map from 'lodash/map'
import each from 'lodash/each'
import replace from 'lodash/replace'
import uniq from 'lodash/uniq'
import first from 'lodash/first'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import toLower from 'lodash/toLower'

const SEPARATOR = '(-|\\s+|\\.|\\/|\\\\|\\:|,)*'
const AMERICANEXPRESS = `((?:3[47][0-9]{2}${SEPARATOR}[0-9]{6}(-|\\s+)?[0-9]{5}))`
const MASTERCARD = `((?:(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}))`
const VISA = `((?:4[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})${SEPARATOR}(?:[0-9]{4})?)`
const DISCOVER = `((?:6(?:011|5[0-9]{2})(?:${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})))`
const JCB = `(?:(?:2131|1800|35\\d{2}${SEPARATOR}[0-9]{1})${SEPARATOR}[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`
const MAESTROWITHDASH = `(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`
const MAESTRO = '(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)\\d{8,15})'
const CC_REGEXES = [
  new RegExp(AMERICANEXPRESS, 'g'),
  new RegExp(MASTERCARD, 'g'),
  new RegExp(VISA, 'g'),
  new RegExp(DISCOVER, 'g'),
  new RegExp(JCB, 'g'),
  new RegExp(MAESTRO, 'g'),
  new RegExp(MAESTROWITHDASH, 'g')
]
const PHONE_NUMBER_REGEX = /\(?(\d{3})\)?[- .]?(\d{3})[- .]?(\d{4})/g
const IMAGE_REGEX = /\.(jpeg|jpg|gif|png)$/
const SPLIT_SHORTCODES_REGEX = /([^\[\]]|\[\])+/g
const NUMBER_REGEX = /^\d+$/
export const ENTITY = {
  SHORTCODE_PREFIX: 'SHORTCODE:',
  URL: 'URL',
  CC: 'CreditCard',
  PHONE: 'Phone',
  EMAIL: 'Email',
  IMAGE: 'Image',
  TERM: 'Term'
}

class MatchDecorators {
  content = ''
  urls = []
  image = []
  email = []
  cc = []
  phone = []
  terms = []
  termKeywords = []

  createShortcode(entity, id) {
    return `[${ENTITY.SHORTCODE_PREFIX}${entity} key=${id}]`
  }

  setContent = content => {
    this.content = content
  }

  setTerms = terms => {
    if (Array.isArray(terms)) {
      this.termKeywords = terms
    }
  }

  ignoreURL = url => {
    const domain = first(url.raw.split('.'))
    const isNumber = NUMBER_REGEX.test(domain)
    return url.schema === '' && isNumber
  }

  findURLAndEmail = () => {
    const urls = LinkifyIt().match(this.content)
    map(urls, (url, i) => {
      const urlType = this.isImageURL(url.url) ? 'image:' : url.schema
      const data = {
        type: urlType,
        shortcode: '',
        url: url.url,
        title: url.raw
      }
      switch (urlType) {
        case 'image:':
          data.shortcode = this.createShortcode(ENTITY.IMAGE, this.image.length)
          this.image.push(data)
          break
        case 'mailto:':
          data.shortcode = this.createShortcode(ENTITY.EMAIL, this.email.length)
          this.email.push(data)
          break
        default:
          data.shortcode = this.createShortcode(ENTITY.URL, this.urls.length)
          this.urls.push(data)
      }
      if (!this.ignoreURL(url)) {
        this.setContent(this.content.replace(url.raw, data.shortcode))
      }
    })
  }

  findCreditCards = () => {
    let ccNums = CC_REGEXES.map(regex => this.content.match(regex))
    ccNums = compact(ccNums)
    ccNums = uniq(ccNums[0])
    map(ccNums, (cc, i) => {
      const shortcode = this.createShortcode(ENTITY.CC, i)
      this.setContent(this.content.replace(cc, shortcode))
      this.cc.push(cc)
    })
  }

  findPhoneNumbers = () => {
    let phoneNumbers = this.content.match(PHONE_NUMBER_REGEX)
    map(phoneNumbers, (phone, i) => {
      const shortcode = this.createShortcode(ENTITY.PHONE, i)
      this.setContent(this.content.replace(phone, shortcode))
      this.phone.push(phone)
    })
  }

  findTerms = () => {
    if (this.termKeywords.length > 0) {
      let termKeywords = []
      each(this.termKeywords, term => {
        const regex = new RegExp(term, 'ig')
        const match = this.content.match(regex)
        if (match) {
          map(uniq(match), (val) => {
            const shortcode = this.createShortcode(ENTITY.TERM, this.terms.length)
            this.setContent(replace(this.content, new RegExp(`(?<=^|\\s)(${val})(?=\\s|$)`, 'g'), shortcode))
            this.terms.push(val)
          });
        }
      })
    }
  }

  isImageURL = url => {
    try {
      return url.match(IMAGE_REGEX) != null
    } catch (e) {
      return false
    }
  }

  splitMessage = content => {
    content = content.match(SPLIT_SHORTCODES_REGEX)
    if (content && content.length > 0) {
      return filter(content, val => {
        return val && val !== ''
      })
    }
    return null
  }

  annotate = () => {
    try {
      this.findURLAndEmail()
      this.findCreditCards()
      this.findPhoneNumbers()
      this.findTerms()
      return {
        content: this.splitMessage(this.content),
        urls: this.urls,
        images: this.image,
        email: this.email,
        cc: this.cc,
        phone: this.phone,
        terms: this.terms
      }
    } catch (e) {
      return null
    }
  }
}

const formatContent = (msg, terms) => {
  const formatMsg = new MatchDecorators()
  formatMsg.setContent(msg)
  formatMsg.setTerms(terms)
  return formatMsg.annotate()
}

export default formatContent
