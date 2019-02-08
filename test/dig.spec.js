// _ already global

describe('_.dig(object, keys...)', () => {
  let family = {
      parent: {
        child: "It's me!"
      }
    }

  it('digs for existing keys', () => {
    expect(_.dig(family, 'parent')).to.deep.equal(family.parent)
  })

  it('digs for existing nested keys', () => {
    expect(_.dig(family, 'parent', 'child')).to.deep.equal(family.parent.child)
  })

  it('digs for non existing nested keys', () => {
    expect(_.dig(family, 'parent', 'child', 'grandchild')).to.be.undefined
  })

  it('digs fail-safely for non existing keys', () => {
    expect(_.dig(family, 'grandparent', 'parent')).to.be.undefined
  })

})
