import _ from './lodash-ext'

import camelizeKeys from './camelize-keys'
import canonic from './canonic'
import deleteBlanks from './delete-blanks'
import dig from './dig'
import { blank, isBlank, present, isPresent } from './blank'
import parse from './parse'
import pickParse from './pick-parse'
import search from './search'
import snakeizeKeys from './snakeize-keys'

// aliases
const camelize = _.camelCase
const clone = _.cloneDeep
const contains = _.isMatch
const dasherize = _.kebabCase
const equals = _.isEqual
const kebabize = _.kebabCase
const snakeize = _.snakeCase
const unaccent = _.deburr
const underscore = _.snakeCase
// common
const assign = _.assign
const camelCase = _.camelCase
const capitalize = _.capitalize
const castArray = _.castArray
const concat = _.concat
const debounce = _.debounce
const defaults = _.defaults
const difference = _.difference
const each = _.each
const endsWith = _.endsWith
const filter = _.filter
const find = _.find
const first = _.first
const get = _.get
const groupBy = _.groupBy
const includes = _.includes
const indexOf = _.indexOf
const isEqual = _.isEqual
const kebabCase = _.kebabCase
const map = _.map
const merge = _.merge
const omit = _.omit
const omitBy = _.omitBy
const pick = _.pick
const random = _.random
const range = _.range
const reduce = _.reduce
const sample = _.sample
const set = _.set
const slice = _.slice
const some = _.some
const sortBy = _.sortBy
const startCase = _.startCase
const startsWith = _.startsWith
const sumBy = _.sumBy
const throttle = _.throttle
const trim = _.trim
const uniq = _.uniq

export {
  // ext only
  blank,
  camelizeKeys,
  canonic,
  deleteBlanks,
  dig,
  isBlank,
  isPresent,
  parse,
  pickParse,
  present,
  search,
  snakeizeKeys,
  // aliases
  camelize,
  clone,
  contains,
  dasherize,
  equals,
  kebabize,
  snakeize,
  unaccent,
  underscore,
  // common
  assign,
  camelCase,
  capitalize,
  castArray,
  concat,
  debounce,
  defaults,
  difference,
  each,
  endsWith,
  filter,
  find,
  first,
  get,
  groupBy,
  includes,
  indexOf,
  isEqual,
  kebabCase,
  map,
  merge,
  omit,
  omitBy,
  pick,
  random,
  range,
  reduce,
  sample,
  set,
  slice,
  some,
  sortBy,
  startCase,
  startsWith,
  sumBy,
  throttle,
  trim,
  uniq
}

export default _
