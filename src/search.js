import includes from 'lodash/includes'
import _canonic from './canonic'


function search(source, target, { canonic = true } = {}) {
  let _source = canonic ? _canonic(source) : source
  let _target = canonic ? _canonic(target) : target

  return includes(_source, _target)
}


export default search
