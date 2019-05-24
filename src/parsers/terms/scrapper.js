import each from 'lodash/each'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import replace from 'lodash/replace'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

/**
 * replaceWord finds the term/val from content through content.
 * @param  {string} content   content through which term needs to be extracted
 * @param  {string} val       term name
 * @param  {string} shortcode shortcode
 * @return {string}           content with shortcode which replaced term
 */
const replaceWord = (content, val, shortcode) => {
  try {
    return replace(
      content,
      new RegExp(`(^|\\b)(?<!:)(${val})(\\b|$)`, 'g'),
      shortcode
    )
  } catch (e) {
    const updatedKey = `:_${val}`
    content = replace(
      content,
      new RegExp(`(^|\\b)(:${val})(\\b|$)`, 'g'),
      updatedKey
    )
    content = replace(
      content,
      new RegExp(`(^|\\b)(${val})(\\b|$)`, 'g'),
      shortcode
    )
    content = replace(
      content,
      new RegExp(`(^|\\b)(${updatedKey})(\\b|$)`, 'g'),
      `:${capitalize(val)}`
    )
    return content
  }
}

/**
 * scrapper function is used to find/extract the terms from string,
 * and replace the terms with image shortcode in content.
 * @param  {string} content
 */
const scrapper = (content, termKeywords) => {
  const terms = []
  try {
    if (termKeywords && termKeywords.length > 0) {
      each(termKeywords, term => {
        const regex = new RegExp(term, 'ig')
        const match = content.match(regex)
        if (match) {
          map(uniq(match), val => {
            const shortcode = createShortcode(ENTITY.TERM, terms.length)
            content = replaceWord(content, val, shortcode)
            terms.push(val)
          })
        }
      })
    }
  } catch (e) {
    logger(e);
  }
  return {
    content,
    terms
  }
}

export default scrapper
