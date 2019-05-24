import each from 'lodash/each'
import includes from 'lodash/includes'
import { ENTITY } from '../config'
import { splitMessage } from '../utils/common'
import UrlScrapper from '../parsers/urls/scrapper'
import EmailScrapper from '../parsers/emails/scrapper'
import ImageScrapper from '../parsers/images/scrapper'
import CreditCardScrapper from '../parsers/creditcards/scrapper'
import PhoneNumberScrapper from '../parsers/phone/scrapper'
import TermsScrapper from '../parsers/terms/scrapper'

const formatContent = (allowedFormats, content, termKeywords) => {
  const data = {
    content: decodeURIComponent(content),
    urls: [],
    images: [],
    emails: [],
    cc: [],
    phone: [],
    terms: []
  }
  const scrappers = [
    {
      id: ENTITY.URL,
      scrapper: () => UrlScrapper(data.content)
    },
    {
      id: ENTITY.EMAIL,
      scrapper: () => EmailScrapper(data.content)
    },
    {
      id: ENTITY.IMAGE,
      scrapper: () => ImageScrapper(data.content)
    },
    {
      id: ENTITY.CC,
      scrapper: () => CreditCardScrapper(data.content)
    },
    {
      id: ENTITY.PHONE,
      scrapper: () => PhoneNumberScrapper(data.content)
    },
    {
      id: ENTITY.TERM,
      scrapper: () => TermsScrapper(data.content, termKeywords)
    }
  ]
  each(scrappers, ({ id, scrapper }) => {
    if (includes(allowedFormats, id)) {
      Object.assign(data, scrapper())
    }
  })
  data.content = splitMessage(data.content)

  return data
}

export default formatContent
