// const _ = require('lodash')
import _ from 'lodash'
// const camelizeKeys = require('./camelize-keys')
import camelizeKeys from './camelize-keys'
// const deleteBlanks = require('./delete-blanks')
import deleteBlanks from './delete-blanks'
// const dig = require('./dig')
import dig from './dig'
// const { isBlank, isPresent } = require('./is-blank')
import { isBlank, isPresent } from './is-blank'
// const snakeizeKeys = require('./snakeize-keys')
import snakeizeKeys from './snakeize-keys'


const lodashExt = Object.assign({}, _, {

  // functions to handle object properties/keys transformation
  camelizeKeys,
  snakeizeKeys,
  deleteBlanks,
  dig,

  // rails like #blank? and #present?
  isBlank,
  isPresent,

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
  contains: _.isMatch

})

// module.exports = lodashExt
export default lodashExt
