// const _ = require('lodash')
import _ from 'lodash'

// inspired by Rails/ActiveSupport Object#blank?
const isBlank = function isBlank(value) {
  if (typeof value === 'string') return !value.trim().length

  // Rails like `blank?` - @https://github.com/lodash/lodash/issues/2261#issuecomment-211380044
  return (_.isEmpty(value) && !_.isNumber(value)) || _.isNaN(value)
}

// inspired by Rails/ActiveSupport Object#present?
const isPresent = function isPresent(obj) {
  return !isBlank(obj);
}

// module.exports = { isBlank, isPresent }
// export { isBlank, isPresent }
export default isBlank
export { isBlank, isPresent }
