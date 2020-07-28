import _ from 'lodash'


/**
 * Creates a new object, ignoring all properties with the given name.
 * Useful when using existent data to create new resources - ignoring "ids".
 *
 * usage:
 * ```js
 * let existent = { id: 1, name: "John Doe", phones: [{ id: 1, number: "12341234" }, { id: 2, number: "43214231" }] }
 *
 * let dup = _.except(existent, 'id')
 * // => { name: "John Doe", phones: [{ number: "12341234" }, { number: "43214321" }] }
 * ```
 *
 * NOTE: if you don't want it to be recursive, use lodash's builtin `_.omit`.
 * - altough you can use option deep: false, like `_.except(object, paths, { deep: false })`
 *
 * @param  {Object} object source object to have its keys/properties ignored to camelCase
 * @return {Object}        "clone" object without target ignored keys
 */
function except(object, paths, { deep = true } = {}) {
  let excepted = _.omit(object, paths)

  if (deep) {
    _.forOwn(excepted, (value, key) => {
      // checks that a value is a plain object or an array - for recursive key conversion
      // recursively update keys of any values that are also objects
      if (_.isObjectLike(value)) {
        excepted[key] = except(value, paths, { deep })
      }
    })
  }

  return excepted
}


export default except
