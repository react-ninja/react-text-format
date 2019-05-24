import LinkifyIt from 'linkify-it'
import filter from 'lodash/filter'
import each from 'lodash/each'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'
import { IMAGE_REGEX, NUMBER_REGEX } from './regex'

/**
 * isImageURL verifies that the provided url is an image url
 * @param  {string}  url url of an image
 * @return {Boolean}
 */
export const isImageURL = url => {
  try {
    return url.match(IMAGE_REGEX) != null
  } catch (e) {
    return false
  }
}

/**
 * scrapper function is used to find/extract the images from string,
 * and replace the images with image shortcode in content.
 * @param  {string} content
 */
const scrapper = content => {
  const images = []
  try {
    let data = LinkifyIt()
      .add('mailto:', null)
      .match(content)
    data = filter(data, val => isImageURL(val.url))
    each(data, (val, i) => {
      const shortcode = createShortcode(ENTITY.IMAGE, images.length)
      content = content.replace(val.raw, shortcode)
      images.push({
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
    images
  }
}

export default scrapper
