import each from 'lodash/each'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import { PHONE_NUMBER_REGEX } from './regex'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

const scraper = content => {
  const phone = []
  try {
    let phoneNumbers = content.match(PHONE_NUMBER_REGEX)
    each(phoneNumbers, (val, i) => {
      const shortcode = createShortcode(ENTITY.PHONE, i)
      content = content.replace(val, shortcode)
      phone.push(val)
    })
  } catch (e) {
    logger(e)
  }
  return {
    content,
    phone
  }
}

export default scraper
