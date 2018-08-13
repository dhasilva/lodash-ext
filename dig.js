import _ from 'lodash'

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
  let dug = object

  for (let i = 0; i < keys.length; i++) {
    if (!_.isObjectLike(dug)) {
      return dug
    }

    const key = keys[i]
    dug = dug[key]
  }

  return dug
}

export default dig
