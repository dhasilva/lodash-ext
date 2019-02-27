// _ already global

describe('_.canonic(string)', () => {

  it('trims the text', () => {
    expect(_.canonic(' John Wick  ')).to.equal('john wick')
  })

  it('normalizes single space', () => {
    expect(_.canonic('lots     of    spaces here')).to.equal('lots of spaces here')
  })

  it('transforms to lower case', () => {
    expect(_.canonic('UPPER_CASE')).to.equal('upper_case')
  })

  it('removes accents/diacritics', () => {
    expect(_.canonic('João do Sossêgo Crítico assunÇão')).to.equal('joao do sossego critico assuncao')
  })

})
