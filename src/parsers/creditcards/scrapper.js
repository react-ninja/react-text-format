import each from 'lodash/each'
import map from 'lodash/map'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
import { CC_REGEXES } from './regex'
import { ENTITY } from '../../config'
import { createShortcode, logger } from '../../utils/common'

const scrapper = content => {
  const cc = []
  try {
    let ccNums = map(CC_REGEXES, regex => content.match(regex))
    ccNums = compact(ccNums)
    ccNums = uniq(ccNums[0])
    each(ccNums, (ccNum, i) => {
      const shortcode = createShortcode(ENTITY.CC, i)
      content = content.replace(ccNum, shortcode)
      cc.push(ccNum)
    });
  } catch (e) {
    logger(e);
  }
  return {
    content,
    cc
  }
}

export default scrapper
