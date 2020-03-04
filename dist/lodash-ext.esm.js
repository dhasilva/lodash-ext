import _ from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import forOwn from 'lodash/forOwn';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import camelCase from 'lodash/camelCase';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.string.trim';
import deburr from 'lodash/deburr';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNaN$1 from 'lodash/isNaN';
import join from 'lodash/join';
import get from 'lodash/get';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.regexp.to-string';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import each from 'lodash/each';
import has from 'lodash/has';
import castArray from 'lodash/castArray';
import difference from 'lodash/difference';
import pick from 'lodash/pick';
import set from 'lodash/set';
import includes from 'lodash/includes';
import snakeCase from 'lodash/snakeCase';

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
  var camelized = cloneDeep(object);
  forOwn(object, function (value, key) {
    // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects
    if (isPlainObject(value) || isArray(value)) {
      value = deepCamelizeKeys(value);
      camelized[key] = value;
    }

    var camelizedKey = camelCase(key);

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

  return camelCase(value);
}

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
  if (string == null) return string;
  var text = string + '';
  return deburr(text.trim().replace(/\s{2,}/g, ' ')).toLowerCase();
}

function blank(value) {
  switch (_typeof(value)) {
    case 'string':
      return !value.trim().length;

    case 'boolean':
      return false;

    default:
      // Rails like `blank?` - @https://github.com/lodash/lodash/issues/2261#issuecomment-211380044
      return isEmpty(value) && !isNumber(value) || isNaN$1(value);
  }
}

function isBlank() {
  // console.warn('DEPRECATED: _.isBlank is deprecated. Use _.blank instead.')
  return blank.apply(void 0, arguments);
} // inspired by Rails/ActiveSupport Object#present?


function present(obj) {
  return !blank(obj);
}

function isPresent() {
  // console.warn('DEPRECATED: _.isPresent is deprecated. Use _.present instead.')
  return present.apply(void 0, arguments);
}

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
  var result = cloneDeep(object);
  forOwn(result, function (value, key) {
    if (isPlainObject(value) || isArray(value)) {
      result[key] = deleteBlanks(value);

      if (isArray(result[key])) {
        remove(result[key], blank);
      }

      if (blank(result[key])) {
        delete result[key];
      }
    } else if (blank(value)) {
      delete result[key];
    }
  });

  if (isArray(result)) {
    remove(result, blank);
  }

  return result;
}

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
  // _.dig(family, 'parent', 'child') => _.get(family, 'parent.child')
  console.warn('[DEPRECATED] _.dig is deprecated. Use _.get instead.');

  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  var path = join(keys, '.');
  return get(object, path);
}

function parse(source, type) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (isArray(source)) {
    return map(source, function (v) {
      return parse(v, type, options);
    });
  }

  if (isPlainObject(source)) {
    return reduce(keys(source), function (parsedObj, key) {
      parsedObj[key] = parse(source[key], type, options);
      return parsedObj;
    }, {});
  } // scalar


  return parse.as(type, source, options);
}

parse.as = function as(type, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var parseFn = $customParsers[type] || $parsers[type];
  if (!parseFn) throw new Error("[@caiena/lodash-ext] _.parse: don't know how to parse as \"".concat(type, "\""));
  return parseFn(value, options);
};

parse.use = function use(parsers) {
  each(parsers, function (parseFn, type) {
    if (typeof parseFn !== 'function') {
      throw new Error("[@caiena/lodash-ext] _.parse: parser for type \"".concat(type, "\" is not a function"));
    }

    if (has($customParsers, type)) {
      console.warn("[@caiena/lodash-ext] _.parse: overriding already defined custom parser for type \"".concat(type, "\""));
    } else if (has($parsers, type)) {
      console.warn("[@caiena/lodash-ext] _.parse: overriding default parser for type \"".concat(type, "\""));
    } // add to $customParsers


    $customParsers[type] = parseFn;
  });
};

parse.remove = function remove(customParserTypes) {
  var types = castArray(customParserTypes);
  var unknownTypes = difference(types, keys($customParsers));

  if (!blank(unknownTypes)) {
    throw new Error("[@caiena/lodash-ext] _.parse: can't remove parser for unknown custom type(s) \"".concat(unknownTypes, "\""));
  }

  each(types, function (type) {
    delete $customParsers[type];
  });
};

var $customParsers = {};
var $parsers = {
  /**
   * Interpreta o valor como Boolean. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  boolean: function boolean(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValue = options.defaultValue;
    var boolean = defaultValue;

    if (value === 'false' || value === false) {
      boolean = false;
    } else if (value === 'true' || value === true) {
      boolean = true;
    }

    return boolean;
  },

  /**
   * Interpreta o valor como Float. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  float: function float(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValue = options.defaultValue; // ignoring malformed strings starting with numbers
    // e.g. parseFloat("+12.9-some_TEXT.in@here/AlR1Gh7?!") == 12.9
    // https://stackoverflow.com/a/1830547

    if (typeof value === 'string' && (/^\s*$/.test(value) || isNaN(value))) {
      return defaultValue;
    }

    var float = parseFloat(value);
    return isNaN(float) ? defaultValue : float;
  },

  /**
   * Interpreta o valor como Integer. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  integer: function integer(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValue = options.defaultValue; // ignoring malformed strings starting with numbers
    // e.g. parseInt("+12.9-some_TEXT.in@here/AlR1Gh7?!", 10) == 12
    // https://stackoverflow.com/a/1830547

    if (typeof value === 'string' && (/^\s*$/.test(value) || isNaN(value))) {
      return defaultValue;
    }

    var int = parseInt(value, 10);
    return isNaN(int) ? defaultValue : int;
  },
  json: function json(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValue = options.defaultValue;
    var object = defaultValue;

    try {
      object = JSON.parse(value);
    } catch (e) {}

    return object;
  },

  /**
   * Interpreta o valor como String. Caso seja String vazia (`''`), retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  string: function string(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var defaultValue = options.defaultValue;
    if (value == null) return ''; // null or undefined

    if (value === true) return 'true';
    if (value === false) return 'false';
    if (isArray(value)) return value.toString();
    if (isPlainObject(value)) return JSON.stringify(value);
    return value && value.toString() || defaultValue;
  }
};

/**
 * Picks and parses each picked value as defined by a config object, using _.parse().
 *
 * usage:
 * ```js
 * // express route, picking and parsing a post/patch request
 * let params = _.pickParse(req.body, {
 *   'id':              'integer',
 *   'user.name':       'string',
 *   'user.admin_flag': 'boolean'
 * })
 *````
 *
 * ```javascript
 * // browser, parsing url query string
 * let params = _.pickParse($route.query, {
 *     // filters
 *     address:   'string',
 *     available: 'boolean',
 *     code:      'integer',
 *     phone:     'string',
 *     since:     'string',
 *     max:       'float',
 *     min:       'float',
 *
 *     // text search
 *     q: 'string',
 *
 *     // paging and sorting
 *     page:  'integer',
 *     sort:  'string',
 *     order: 'string'
 *   })
 * )
 * ````
 *
 * @param  {Object} object  source object
 * @param  {Object} config  config object, mapping attributes to be picked to their parsing type
 * @param  {Object} options not used
 * @return {Object}         Objeto resultado da interpretação definida
 */

function pickParse(object) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var keys$1 = keys(config);

  var picked = pick(object, keys$1);
  return reduce(keys$1, function (pickedAndParsed, key) {
    var type = get(config, key);
    var value = get(picked, key);

    var parsed = parse(value, type, options);

    set(pickedAndParsed, key, parsed);
    return pickedAndParsed;
  }, {});
}

function search(source, target) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$canonic = _ref.canonic,
      canonic$1 = _ref$canonic === void 0 ? true : _ref$canonic;

  var _source = canonic$1 ? canonic(source) : source;

  var _target = canonic$1 ? canonic(target) : target;

  return includes(_source, _target);
}

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
  var snakeized = cloneDeep(object);
  forOwn(object, function (value, key) {
    // checks that a value is a plain object or an array - for recursive key conversion
    // recursively update keys of any values that are also objects
    if (isPlainObject(value) || isArray(value)) {
      value = deepSnakeizeKeys(value);
      snakeized[key] = value;
    }

    var snakeizedKey = snakeCase(key);

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

  return snakeCase(value);
}

var lodashExt = _.runInContext();

lodashExt.mixin({
  // functions to handle object properties/keys transformation
  camelizeKeys: camelizeKeys,
  snakeizeKeys: snakeizeKeys,
  deleteBlanks: deleteBlanks,
  dig: dig,
  // rails like #blank? and #present?
  blank: blank,
  present: present,
  isBlank: isBlank,
  // DEPRECATED
  isPresent: isPresent,
  // DEPRECATED
  // string functions
  canonic: canonic,
  search: search,
  // parsing functions
  parse: parse,
  pickParse: pickParse,
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
  contains: _.isMatch,
  unaccent: _.deburr
});

var common = lodashExt.pick(lodashExt, [// ext only
'blank', 'camelizeKeys', 'canonic', 'deleteBlanks', 'dig', 'isBlank', 'isPresent', 'parse', 'pickParse', 'present', 'search', 'snakeizeKeys', // aliases
'camelize', 'clone', 'contains', 'dasherize', 'equals', 'kebabize', 'snakeize', 'unaccent', 'underscore', // commonly used subset of lodash
'assign', 'camelCase', 'capitalize', 'castArray', 'concat', 'debounce', 'defaults', 'difference', 'each', 'endsWith', 'filter', 'find', 'first', 'get', 'groupBy', 'includes', 'indexOf', 'isEqual', 'kebabCase', 'map', 'merge', 'omit', 'omitBy', 'pick', 'random', 'range', 'reduce', 'sample', 'set', 'slice', 'some', 'sortBy', 'startCase', 'startsWith', 'sumBy', 'throttle', 'trim', 'uniq']);

export default lodashExt;
export { common };
