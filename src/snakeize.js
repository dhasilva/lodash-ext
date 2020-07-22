import _ from 'lodash'

const IGNORED_LEADING_CHARS = ["_", "$"]

/**
 * Similar to _.snakeCase(), but it keeps leading "_" or "$" in place.
 * Useful when handling (fetching) API data.
 *
 * usage:
 * ```js
 * let propName = "_private_attr"
 * _.snakeize(propName)
 * // => "_private_attr"
 * ````
 *
 * @param  {String} value source string to be transformed to snake_case
 * @return {String}        "clone" string in snake_case format
 */
function snakeize(value) {
  if (value == null) return null

  if (_.some(IGNORED_LEADING_CHARS, (ignoredChar) => _.startsWith(value, ignoredChar))) {
    return `${value[0]}${snakeize(value.substr(1))}`
  }

  return _.snakeCase(value)
}


export default snakeize
