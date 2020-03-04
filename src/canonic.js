import deburr from 'lodash/deburr'


/**
 * Creates a canonical representation of the given string:
 * - trimmed
 * - lower case
 * - "unaccented" (ascii letters only)
 * - white spaces normalizet to single space
 *
 * @param  {String} string the source to produce a canonical value
 * @return {String}        the canonical representation of the given string
 */
function canonic(string) {
  if (string == null) return string
  let text = string + ''
  return deburr(text.trim().replace(/\s{2,}/g, ' ')).toLowerCase()
}


export default canonic
