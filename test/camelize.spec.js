// _ already global

describe('_.camelize(string)', () => {

  describe('when string starts with a _', () => {
    it('ignores the leading _, keeping it there', () => {
      expect(_.camelize("_destroy")).to.equal("_destroy")
      expect(_.camelize("_private_attribute")).to.equal("_privateAttribute")
    })

    it('works with _', () => {
      expect(_.camelize("_")).to.equal('_')
    })
  })

  describe('when string starts with a $', () => {
    it('ignores the leading $, keeping it there', () => {
      expect(_.camelize("$destroy")).to.equal("$destroy")
      expect(_.camelize("$private_attribute")).to.equal("$privateAttribute")
    })
  })

})
