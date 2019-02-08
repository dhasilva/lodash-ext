import _ from 'lodash'

// inspired by Rails/ActiveSupport Object#blank?
const isBlank = function isBlank(value) {
  switch (typeof value) {
    case 'string': return !value.trim().length
    case 'boolean': return false
    default:
      // Rails like `blank?` - @https://github.com/lodash/lodash/issues/2261#issuecomment-211380044
      return (_.isEmpty(value) && !_.isNumber(value)) || _.isNaN(value)
  }
}

// inspired by Rails/ActiveSupport Object#present?
const isPresent = function isPresent(obj) {
  return !isBlank(obj);
}


export default isBlank
export { isBlank, isPresent }
