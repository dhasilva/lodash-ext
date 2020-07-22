import _ from 'lodash'
import snakeize from './snakeize'

/**
 * Creates a new object transforming all of its properties to snake_case format.
 * Useful when handling (fetching) API data.
 *
 * usage:
 * ```js
 * let json = { first: 1, secondPlace: 2, ThirdOne: 3 }
 *
 * _.snakeizeKeys(json) == { first: 1, second_place: 2, third_one: 3 }
 * ````
 *
 * @param  {Object} object source object to have its keys/properties transformed to snake_case
 * @return {Object}        "clone" object with all keys/properties in snake_case format
 */
function deepSnakeizeKeys(object) {
  let snakeized = _.cloneDeep(object)

  _.forOwn(object, (value, key) => {

    // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects
    if (_.isPlainObject(value) || _.isArray(value)) {
      value = deepSnakeizeKeys(value)
      snakeized[key] = value
    }

    const snakeizedKey = snakeize(key)
    if (snakeizedKey !== key) {
      snakeized[snakeizedKey] = value
      delete snakeized[key]
    }
  })

  return snakeized
}

function snakeizeKeys(value) {
  if (typeof (value) === 'object') {
    return deepSnakeizeKeys(value)
  }
  return snakeize(value)
}


export default snakeizeKeys
