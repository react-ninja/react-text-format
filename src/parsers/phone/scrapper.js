import each from 'lodash/each'
import { PHONE_NUMBER_REGEX } from './regex'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'
/**
 * scraper function is used to find/extract the phone from content argument,
 * @param  {string} content
 */
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
