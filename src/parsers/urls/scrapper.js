import LinkifyIt from 'linkify-it'
import first from 'lodash/first'
import filter from 'lodash/filter'
import each from 'lodash/each'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'
import { NUMBER_REGEX } from './regex'
import { isImageURL } from '../images/scrapper'

const isNumberedDomain = url => {
  try {
    const domain = first(url.split('.'))
    const isNumber = NUMBER_REGEX.test(domain)
    return url.schema === '' && isNumber
  } catch (e) {
    return false
  }
}

const scrapper = content => {
  const urls = []
  try {
    const data = LinkifyIt()
      .add('mailto:', null)
      .match(content)
    const links = filter(
      data,
      val => !isImageURL(val.url) && !isNumberedDomain(val.raw)
    )
    each(links, (val, i) => {
      const shortcode = createShortcode(ENTITY.URL, urls.length);
      content = content.replace(val.raw, shortcode)
      urls.push({
        type: val.schema || 'http:',
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
    urls
  }
}

export default scrapper
