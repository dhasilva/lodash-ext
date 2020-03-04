import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import each from 'lodash/each'
import has from 'lodash/has'
import castArray from 'lodash/castArray'
import difference from 'lodash/difference'
import { blank } from './blank'


function parse(source, type, options = {}) {
  if (isArray(source)) {
    return map(source, (v) => parse(v, type, options))
  }

  if (isPlainObject(source)) {
    return reduce(keys(source), (parsedObj, key) => {
      parsedObj[key] = parse(source[key], type, options)
      return parsedObj
    }, {})
  }

  // scalar
  return parse.as(type, source, options)
}


parse.as = function as(type, value, options = {}) {
  let parseFn = $customParsers[type] || $parsers[type]
  if (!parseFn) throw new Error(`[@caiena/lodash-ext] _.parse: don't know how to parse as "${type}"`)

  return parseFn(value, options)
}

parse.use = function use(parsers) {
  each(parsers, (parseFn, type) => {
    if (typeof parseFn !== 'function') {
      throw new Error(`[@caiena/lodash-ext] _.parse: parser for type "${type}" is not a function`)
    }

    if (has($customParsers, type)) {
      console.warn(`[@caiena/lodash-ext] _.parse: overriding already defined custom parser for type "${type}"`)
    }
    else if (has($parsers, type)) {
      console.warn(`[@caiena/lodash-ext] _.parse: overriding default parser for type "${type}"`)
    }

    // add to $customParsers
    $customParsers[type] = parseFn
  })
}

parse.remove = function remove(customParserTypes) {
  let types = castArray(customParserTypes)
  let unknownTypes = difference(types, keys($customParsers))

  if (!blank(unknownTypes)) {
    throw new Error(`[@caiena/lodash-ext] _.parse: can't remove parser for unknown custom type(s) "${unknownTypes}"`)
  }

  each(types, (type) => { delete $customParsers[type] })
}


const $customParsers = {}

const $parsers = {
  /**
   * Interpreta o valor como Boolean. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  boolean(value, options = {}) {
    const { defaultValue } = options
    let boolean = defaultValue

    if (value === 'false' || value === false) {
      boolean = false
    } else if (value === 'true' || value === true) {
      boolean = true
    }

    return boolean
  },

  /**
   * Interpreta o valor como Float. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  float(value, options = {}) {
    const { defaultValue } = options

    // ignoring malformed strings starting with numbers
    // e.g. parseFloat("+12.9-some_TEXT.in@here/AlR1Gh7?!") == 12.9
    // https://stackoverflow.com/a/1830547
    if ((typeof value === 'string') && (/^\s*$/.test(value) || isNaN(value))) {
      return defaultValue
    }

    const float = parseFloat(value)

    return isNaN(float) ? defaultValue : float
  },

  /**
   * Interpreta o valor como Integer. Caso não consiga, retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  integer(value, options = {}) {
    const { defaultValue } = options

    // ignoring malformed strings starting with numbers
    // e.g. parseInt("+12.9-some_TEXT.in@here/AlR1Gh7?!", 10) == 12
    // https://stackoverflow.com/a/1830547
    if ((typeof value === 'string') && (/^\s*$/.test(value) || isNaN(value))) {
      return defaultValue
    }

    const int = parseInt(value, 10)

    return isNaN(int) ? defaultValue : int
  },


  json(value, options = {}) {
    const { defaultValue } = options

    let object = defaultValue

    try {
      object = JSON.parse(value)
    } catch (e) {}

    return object
  },

  /**
   * Interpreta o valor como String. Caso seja String vazia (`''`), retorna
   * options.defaultValue - que por padrão é `undefined`.
   *
   * @param  {[type]} value   [description]
   * @param  {Object} options [description]
   * @return {[type]}         [description]
   */
  string(value, options = {}) {
    const { defaultValue } = options

    if (value == null)    return '' // null or undefined
    if (value === true)   return 'true'
    if (value === false)  return 'false'
    if (isArray(value)) return value.toString()
    if (isPlainObject(value)) return JSON.stringify(value)

    return (value && value.toString()) || defaultValue
  },
}



export default parse
