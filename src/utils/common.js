import filter from 'lodash/filter'
import { ENTITY } from '../config'

/**
 * createShortcode function creates the shortcode string which replaces
 * the required content or data-type (phone, email, ...)
 * @param  {string} entity it is based on the entities defined in config
 * @param  {string|integer} id     id is index of data in specific data-type array
 * @return {string}
 */
export const createShortcode = (entity, id) => {
  return `[${ENTITY.SHORTCODE_PREFIX}${entity} key=${id}]`
}

/**
 * splitMessage split the string through the shortcodes paranthesis
 * @param  {string} content content from which all the data-type/data-formats have been extracted
 * @return {array}
 */
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

/**
 * logger is used to manage the console.logs from package.
 * #TODO: add sentry integration to get the issue logs on production
 * @param  {array, object, string} args
 */
export const logger = (...args) => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'development'
  ) {
    console.log(...args)
  }
}
