import filter from 'lodash/filter'
import { ENTITY } from '../config'

export const createShortcode = (entity, id) => {
  return `[${ENTITY.SHORTCODE_PREFIX}${entity} key=${id}]`
}

export const splitMessage = content => {
  const SPLIT_SHORTCODES_REGEX = /([^\[\]]|\[\])+/g
  content = content.match(SPLIT_SHORTCODES_REGEX)
  if (content && content.length > 0) {
    return filter(content, val => {
      return val && val !== ''
    })
  }
  return null
}

export const logger = (...args) => {
  console.log(...args)
}
