// _ already global

describe('_.except(object)', () => {

  let object = {
    id: 1,
    name: "John Doe",
    address: {
      id: 1,
      address: "St. Elsewhere, N/A"
    },
    phones: [{
      id: 1,
      number: "12341234"
    }, {
      id: 2,
      number: "43214231"
    }]
  }
  let excepted = _.except(object, "id")



  describe('recursive - default, option { deep: true }', () => {

    describe('with direct keys', () => {
      it('removes keys', () => {
        expect(excepted.id).to.be.undefined
        expect(_.has(excepted, 'id')).to.be.false
      })
    })

    describe('with nested object keys', () => {
      it('removes keys', () => {
        expect(_.get(excepted, 'address.id')).to.be.undefined
        expect(_.has(excepted, 'address.id')).to.be.false
      })
    })

    describe('with nested objects in array keys', () => {
      it('removes keys', () => {
        expect(
          _.all(_.map(excepted.phones, 'id'), _.isUndefined)
        ).to.be.true
      })
    })

  })

  // XXX: you should use _.omit() instead of except for non-recursive.
  describe('non recursive - option { deep: false }', () => {
    let excepted = _.except(object, "id", { deep: false })

    describe('with direct keys', () => {
      it('removes keys', () => {
        expect(excepted.id).to.be.undefined
        expect(_.has(excepted, 'id')).to.be.false
      })
    })

    describe('with nested object keys', () => {
      it('does not remove keys', () => {
        expect(_.get(excepted, 'address.id')).to.exist
        expect(_.has(excepted, 'address.id')).to.be.true
      })
    })

    describe('with nested objects in array keys', () => {
      it('does not remove keys', () => {
        expect(
          _.any(_.map(excepted.phones, 'id'), _.isUndefined)
        ).to.be.false
      })
    })
  })

})
