import _ from 'lodash'
import camelizeKeys from './camelize-keys'
import canonic from './canonic'
import deleteBlanks from './delete-blanks'
import dig from './dig'
import { blank, isBlank, present, isPresent } from './blank'
import parse from './parse'
import pickParse from './pick-parse'
import search from './search'
import snakeizeKeys from './snakeize-keys'


const lodashExt = _.runInContext()
lodashExt.mixin({

  // functions to handle object properties/keys transformation
  camelizeKeys,
  snakeizeKeys,
  deleteBlanks,
  dig,

  // rails like #blank? and #present?
  blank,
  present,
  isBlank, // DEPRECATED
  isPresent, // DEPRECATED

  // string functions
  canonic,
  search,

  // parsing functions
  parse,
  pickParse,

  // aliasing commonly used functions
  camelize:   _.camelCase,
  // capitalize: _.capitalize,
  dasherize:  _.kebabCase,
  kebabize:   _.kebabCase,
  underscore: _.snakeCase,
  snakeize:   _.snakeCase,

  clone:    _.cloneDeep,
  // extend:   _.extend,
  // merge:    _.merge,
  equals:   _.isEqual,
  contains: _.isMatch,

  unaccent: _.deburr
})


export default lodashExt
