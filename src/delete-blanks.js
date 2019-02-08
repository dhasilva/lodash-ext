import _ from 'lodash'
import { isBlank } from './is-blank'

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
  let result = _.cloneDeep(object)

  _.forOwn(result, (value, key) => {
    if (_.isPlainObject(value) || _.isArray(value)) {
      result[key] = deleteBlanks(value)

      if (_.isArray(result[key])) {
        _.remove(result[key], isBlank)
      }

      if (isBlank(result[key])) {
        delete result[key]
      }

    } else if (isBlank(value)) {
      delete result[key]
    }
  })

  if (_.isArray(result)) {
    _.remove(result, isBlank)
  }

  return result
}


export default deleteBlanks
