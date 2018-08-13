const _ = require('lodash')

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

  Object.keys(result).forEach((key) => {
    let value = result[key]

    if (_.isPlainObject(value) || _.isArray(value)) {
      result[key] = deleteBlanks(value)

      if (_.isEmpty(result[key])) delete result[key]

    } else if (value === null || value === undefined) {
      delete result[key]
    }
  })

  return result
}

// export default deleteBlanks
module.exports = deleteBlanks
