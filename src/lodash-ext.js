const _ = require('lodash')
const camelizeKeys = require('./camelize-keys')
const deleteBlanks = require('./delete-blanks')
const dig = require('./dig')
const { isBlank, isPresent } = require('./is-blank')
const snakeizeKeys = require('./snakeize-keys')

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

// export default lodashExt
module.exports = lodashExt
