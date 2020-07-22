// _ already global

describe('_.snakeize(string)', () => {

  describe('when string starts with a _', () => {
    it('ignores the leading _, keeping it there', () => {
      expect(_.snakeize("_destroy")).to.equal("_destroy")
      expect(_.snakeize("_privateAttribute")).to.equal("_private_attribute")
    })

    it('works with _', () => {
      expect(_.snakeize("_")).to.equal('_')
    })
  })

  describe('when string starts with a $', () => {
    it('ignores the leading $, keeping it there', () => {
      expect(_.snakeize("$destroy")).to.equal("$destroy")
      expect(_.snakeize("$privateAttribute")).to.equal("$private_attribute")

      expect(_.underscore("$destroy")).to.equal("$destroy")
      expect(_.underscore("$privateAttribute")).to.equal("$private_attribute")
    })
  })

})
