import LinkifyIt from 'linkify-it'
import first from 'lodash/first'
import filter from 'lodash/filter'
import each from 'lodash/each'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

const scrapper = content => {
  const emails = []
  try {
    const data = LinkifyIt()
      .add('http:', null)
      .add('ftp:', null)
      .match(content)
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
