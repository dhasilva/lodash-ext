import cloneDeep from 'lodash/cloneDeep'
import forOwn from 'lodash/forOwn'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import camelCase from 'lodash/camelCase'

/**
 * Creates a new object, transforming all of its properties to camelCase format.
 * Useful when handling (fetching) API data.
 *
 * usage:
 * ```js
 * let json = { first: 1, second-place: 2, third_one: 3 }
 *
 * _.camelizeKeys(json) == { first: 1, secondPlace: 2, thirdOne: 3 }
 * ```
 *
 * @param  {Object} object source object to have its keys/properties transformed to camelCase
 * @return {Object}        "clone" object with all keys/properties in camelCase format
 */
function deepCamelizeKeys(object) {
  let camelized = cloneDeep(object)

  forOwn(object, (value, key) => {

    // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects
    if (isPlainObject(value) || isArray(value)) {
      value = deepCamelizeKeys(value)
      camelized[key] = value
    }

    const camelizedKey = camelCase(key)
    if (camelizedKey !== key) {
      camelized[camelizedKey] = value
      delete camelized[key]
    }
  })

  return camelized
}

function camelizeKeys(value) {
  if (typeof (value) === 'object') {
    return deepCamelizeKeys(value)
  }
  return camelCase(value)
}


export default camelizeKeys
