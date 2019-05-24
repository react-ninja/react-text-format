const SEPARATOR = '(-|\\s|\\.|\\/|\\\\|\\:|,)*'
const AMERICANEXPRESS = `((?:3[47][0-9]{2}${SEPARATOR}[0-9]{6}(-|\\s+)?[0-9]{5}))`
const MASTERCARD = `((?:(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}))`
const VISA = `((?:4[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})${SEPARATOR}(?:[0-9]{4})?)`
const DISCOVER = `((?:6(?:011|5[0-9]{2})(?:${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})))`
const JCB = `(?:(?:2131|1800|35\\d{2}${SEPARATOR}[0-9]{1})${SEPARATOR}[0-9]{3}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`
const MAESTROWITHDASH = `(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4}${SEPARATOR}[0-9]{4})`
const MAESTRO = '(?:(?:5[0678]\\d\\d|6304|6390|67\\d\\d)\\d{8,15})'
export const CC_REGEXES = [
  new RegExp(AMERICANEXPRESS, 'g'),
  new RegExp(MASTERCARD, 'g'),
  new RegExp(VISA, 'g'),
  new RegExp(DISCOVER, 'g'),
  new RegExp(JCB, 'g'),
  new RegExp(MAESTRO, 'g'),
  new RegExp(MAESTROWITHDASH, 'g')
]
