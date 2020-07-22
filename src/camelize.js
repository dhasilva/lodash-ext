import _ from 'lodash'

const IGNORED_LEADING_CHARS = ["_", "$"]

/**
 * Similar to _.camelCase(), but it keeps leading "_" or "$" in place.
 * Useful when handling (fetching) API data.
 *
 * usage:
 * ```js
 * let propName = "_private_attr"
 * _.camelize(propName)
 * // => "_privateAttr"
 * ````
 *
 * @param  {String} value source string to be transformed to camelCase
 * @return {String}        "clone" string in camelCase format
 */
function camelize(value) {
  if (value == null) return null

  if (_.some(IGNORED_LEADING_CHARS, (ignoredChar) => _.startsWith(value, ignoredChar))) {
    return `${value[0]}${camelize(value.substr(1))}`
  }

  return _.camelCase(value)
}


export default camelize
