import _ from 'lodash'

// inspired by Rails/ActiveSupport Object#blank?
const isBlank = function isBlank(value) {
  return _.isEmpty(value) && !_.isNumber(value) || _.isNaN(value);
}

// inspired by Rails/ActiveSupport Object#present?
const isPresent = function isPresent(obj) {
  return !isBlank(obj);
}

export { isBlank, isPresent }
