import _ from 'lodash';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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
  var camelized = _.cloneDeep(object);

  Object.keys(object).forEach(function (key) {
    var value = object[key]; // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects

    if (_.isPlainObject(value) || _.isArray(value)) {
      value = deepCamelizeKeys(value);
      camelized[key] = value;
    }

    var camelizedKey = _.camelCase(key);

    if (camelizedKey !== key) {
      camelized[camelizedKey] = value;
      delete camelized[key];
    }
  });
  return camelized;
}

function camelizeKeys(value) {
  if (_typeof(value) === 'object') {
    return deepCamelizeKeys(value);
  }

  return _.camelCase(value);
} // module.exports = camelizeKeys

// const _ = require('lodash')
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
  var result = _.cloneDeep(object);

  Object.keys(result).forEach(function (key) {
    var value = result[key];

    if (_.isPlainObject(value) || _.isArray(value)) {
      result[key] = deleteBlanks(value);
      if (_.isEmpty(result[key])) delete result[key];
    } else if (value === null || value === undefined) {
      delete result[key];
    }
  });
  return result;
} // module.exports = deleteBlanks

// const _ = require('lodash')
/**
 * "Digs" the object searching for nested properties, ensuring it exists - or returning null.
 * Inspired by Ruby Object#dig.
 *
 * usage:
 * ```js
 * let family = { parent: { child: "Okay!" } }
 *
 * _.dig(family, 'parent', 'child')  === "Okay!"
 * _.dig(family, 'parent', 'child', 'grandchild')  === undefined
 * _.dig(family, 'no', 'not really') === undefined
 * ````
 *
 * @param  {Object}    object source object
 * @param  {...String} keys   sequence of keys defining the path to be dug
 * @return {Object}           value of the nested properti, or `undefined` if it does not exist
 */

function dig(object) {
  var dug = object;

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    if (!_.isObjectLike(dug)) {
      return dug;
    }

    var key = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    dug = dug[key];
  }

  return dug;
} // module.exports = dig

var isBlank = function isBlank(value) {
  switch (_typeof(value)) {
    case 'string':
      return !value.trim().length;

    case 'boolean':
      return false;

    default:
      // Rails like `blank?` - @https://github.com/lodash/lodash/issues/2261#issuecomment-211380044
      return _.isEmpty(value) && !_.isNumber(value) || _.isNaN(value);
  }
}; // inspired by Rails/ActiveSupport Object#present?


var isPresent = function isPresent(obj) {
  return !isBlank(obj);
}; // module.exports = { isBlank, isPresent }

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
  var snakeized = _.cloneDeep(object);

  Object.keys(object).forEach(function (key) {
    var value = object[key]; // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects

    if (_.isPlainObject(value) || _.isArray(value)) {
      value = deepSnakeizeKeys(value);
      snakeized[key] = value;
    }

    var snakeizedKey = _.snakeCase(key);

    if (snakeizedKey !== key) {
      snakeized[snakeizedKey] = value;
      delete snakeized[key];
    }
  });
  return snakeized;
}

function snakeizeKeys(value) {
  if (_typeof(value) === 'object') {
    return deepSnakeizeKeys(value);
  }

  return _.snakeCase(value);
} // module.exports = snakeizeKeys

// const _ = require('lodash')
var lodashExt = Object.assign({}, _, {
  // functions to handle object properties/keys transformation
  camelizeKeys: camelizeKeys,
  snakeizeKeys: snakeizeKeys,
  deleteBlanks: deleteBlanks,
  dig: dig,
  // rails like #blank? and #present?
  isBlank: isBlank,
  isPresent: isPresent,
  // aliasing commonly used functions
  camelize: _.camelCase,
  // capitalize: _.capitalize,
  dasherize: _.kebabCase,
  kebabize: _.kebabCase,
  underscore: _.snakeCase,
  snakeize: _.snakeCase,
  clone: _.cloneDeep,
  // extend:   _.extend,
  // merge:    _.merge,
  equals: _.isEqual,
  contains: _.isMatch
}); // module.exports = lodashExt

// const lodashExt = require('./lodash-ext')

export default lodashExt;
