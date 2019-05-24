import each from 'lodash/each'
import map from 'lodash/map'
import uniq from 'lodash/uniq'
import replace from 'lodash/replace'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

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
