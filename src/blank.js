import _ from 'lodash'

// inspired by Rails/ActiveSupport Object#blank?
function blank(value) {
  switch (typeof value) {
    case 'string': return !value.trim().length
    case 'boolean': return false
    default:
      // Rails like `blank?` - @https://github.com/lodash/lodash/issues/2261#issuecomment-211380044
      return (_.isEmpty(value) && !_.isNumber(value)) || _.isNaN(value)
  }
}

function isBlank(...args) {
  // console.warn('DEPRECATED: _.isBlank is deprecated. Use _.blank instead.')

  return blank(...args)
}


// inspired by Rails/ActiveSupport Object#present?
function present(obj) {
  return !blank(obj);
}

function isPresent(...args) {
  // console.warn('DEPRECATED: _.isPresent is deprecated. Use _.present instead.')

  return present(...args)
}


export default blank
export {
  blank,
  present,
  isBlank, // DEPRECATED
  isPresent // DEPRECATED
}
