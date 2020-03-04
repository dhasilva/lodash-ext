import cloneDeep from 'lodash/cloneDeep'
import forOwn from 'lodash/forOwn'
import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import remove from 'lodash/remove'

import { blank } from './blank'

/**
 * Creates a new object, ignoring all keys/properties with "empty" values: null, undefined or empty objects or arrays.
 *
 * usage:
 * ```js
 * let obj = { value1: "val1", value2: undefined, value3: null, value4: {} }
 *
 * _.deleteBlanks(obj) === { value1: "val1" }
 * ````
 *
 * @param  {Object} object source object to have its "blank properties" deleted
 * @return {Object}        new object without the "blank" properties
 */
function deleteBlanks(object) {
  let result = cloneDeep(object)

  forOwn(result, (value, key) => {
    if (isPlainObject(value) || isArray(value)) {
      result[key] = deleteBlanks(value)

      if (isArray(result[key])) {
        remove(result[key], blank)
      }

      if (blank(result[key])) {
        delete result[key]
      }

    } else if (blank(value)) {
      delete result[key]
    }
  })

  if (isArray(result)) {
    remove(result, blank)
  }

  return result
}


export default deleteBlanks
