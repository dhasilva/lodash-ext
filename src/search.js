import _ from 'lodash'
import _canonic from './canonic'


function search(source, target, { canonic = true } = {}) {
  let _source = canonic ? _canonic(source) : source
  let _target = canonic ? _canonic(target) : target

  return _.includes(_source, _target)
}


export default search
