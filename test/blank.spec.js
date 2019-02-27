// _ already global
import * as module from '../src/blank'


describe('_.blank(val)', () => {

  // Simulating a "shared behavior" to reproduce tests with legacy compatibility methods (i.e. _.isBlank)
  // @see https://github.com/mochajs/mocha/wiki/Shared-Behaviours
  const behavesLikeBlank = (fn) => {

    describe('blank values', () => {
      it('considers empty string as blank', () => {
        expect(fn('')).to.be.true
      })

      it('considers all blank spaces string as blank', () => {
        expect(fn('   ')).to.be.true
      })

      it('considers null as blank', () => {
        expect(fn(null)).to.be.true
      })

      it('considers undefined as blank', () => {
        expect(fn(undefined)).to.be.true
      })

      it('considers empty array as blank', () => {
        expect(fn([])).to.be.true
      })

      it('considers empty object as blank', () => {
        expect(fn({})).to.be.true
      })
    })


    describe('not blank values', () => {
      it('considers non-empty string as not blank', () => {
        let string = _.sample(['a', '0', 'asda', '    a '])
        expect(fn(string)).to.be.false
      })

      it('considers true as not blank', () => {
        expect(fn(true)).to.be.false
      })

      it('considers false as not blank', () => {
        expect(fn(true)).to.be.false
      })

      it('considers 0 as not blank', () => {
        expect(fn(0)).to.be.false
      })

      it('considers non-empty array as not blank', () => {
        expect(fn([1])).to.be.false
      })

      it('considers non-empty object as not blank', () => {
        expect(fn({ a: 1 })).to.be.false
      })
    })

  }


  // tests for real - _.blank
  behavesLikeBlank(_.blank)

  // shared behaviour - _.isBlank
  describe('[legacy] _.isBlank behaves like _.blank', () => {
    behavesLikeBlank(_.isBlank)
  })

})
