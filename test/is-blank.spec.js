// _ already global

describe('_.isBlank(val)', () => {

  describe('blank values', () => {
    it('considers empty string as blank', () => {
      expect(_.isBlank('')).to.be.true
    })

    it('considers all blank spaces string as blank', () => {
      expect(_.isBlank('   ')).to.be.true
    })

    it('considers null as blank', () => {
      expect(_.isBlank(null)).to.be.true
    })

    it('considers undefined as blank', () => {
      expect(_.isBlank(undefined)).to.be.true
    })

    it('considers empty array as blank', () => {
      expect(_.isBlank([])).to.be.true
    })

    it('considers empty object as blank', () => {
      expect(_.isBlank({})).to.be.true
    })
  })


  describe('not blank values', () => {
    it('considers non-empty string as not blank', () => {
      let string = _.sample(['a', '0', 'asda', '    a '])
      expect(_.isBlank(string)).to.be.false
    })

    it('considers true as not blank', () => {
      expect(_.isBlank(true)).to.be.false
    })

    it('considers false as not blank', () => {
      expect(_.isBlank(true)).to.be.false
    })

    it('considers 0 as not blank', () => {
      expect(_.isBlank(0)).to.be.false
    })

    it('considers non-empty array as not blank', () => {
      expect(_.isBlank([1])).to.be.false
    })

    it('considers non-empty object as not blank', () => {
      expect(_.isBlank({ a: 1 })).to.be.false
    })
  })

})
