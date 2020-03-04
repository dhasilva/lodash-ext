import join from 'lodash/join'
import get from 'lodash/get'

/**
 * "Digs" the object searching for nested properties, ensuring it exists - or returning null.
 * Inspired by Ruby Object#dig.
 *
 * usage:
 * ```js
 * let family = { parent: { child: "Okay!" } }
 *
 * _.dig(family, 'parent', 'child')  === "Okay!"
 * _.dig(family, 'parent', 'child', 'grandchild')  === undefined
 * _.dig(family, 'no', 'not really') === undefined
 * ````
 *
 * @param  {Object}    object source object
 * @param  {...String} keys   sequence of keys defining the path to be dug
 * @return {Object}           value of the nested properti, or `undefined` if it does not exist
 */
function dig(object, ...keys) {
  // _.dig(family, 'parent', 'child') => _.get(family, 'parent.child')
  console.warn('[DEPRECATED] _.dig is deprecated. Use _.get instead.')

  let path = join(keys, '.')
  return get(object, path)
}


export default dig
