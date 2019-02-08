import _ from 'lodash'
import camelizeKeys from './camelize-keys'
import deleteBlanks from './delete-blanks'
import dig from './dig'
import { isBlank, isPresent } from './is-blank'
import snakeizeKeys from './snakeize-keys'


const lodashExt = _.assign({}, _, {

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


export default lodashExt
