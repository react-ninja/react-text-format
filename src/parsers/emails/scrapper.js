import LinkifyIt from 'linkify-it'
import filter from 'lodash/filter'
import each from 'lodash/each'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

/**
 * scrapper function is used to find/extract the emails from string,
 * and replace the emails with email shortcode in content.
 *
 * @param  {string} content
 */
const scrapper = content => {
  const emails = []
  try {
    let data = LinkifyIt().match(content)
    data = filter(data, val => val.schema === 'mailto:')
    each(data, (val, i) => {
      const shortcode = createShortcode(ENTITY.EMAIL, emails.length)
      content = content.replace(val.raw, shortcode)
      emails.push({
        type: val.schema || 'mailto:',
        shortcode,
        url: val.url,
        title: val.raw
      })
    })
  } catch (e) {
    logger(e)
  }
  return {
    content,
    emails
  }
}

export default scrapper
