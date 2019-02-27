// _ already global

describe('_.search(source, target, { canonic = true })', () => {

  context('without options', () => {
    it('matches canonic strings', () => {
      expect(_.search(' João  Assunção ', 'assuncao')).to.be.true
    })
  })

  context('options', () => {
    describe('canonic', () => {
      context('with canonic: true', () => {
        it('matches canonic strings', () => {
          expect(_.search(' João  Assunção ', 'assuncao')).to.be.true
        })
      })

      context('with canonic: false', () => {
        it('does not match canonic strings', () => {
          expect(_.search(' João  Assunção ', 'assuncao', { canonic: false })).to.be.false
        })
      })
    })
  })

})
