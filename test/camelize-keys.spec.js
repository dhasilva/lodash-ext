// _ already global

describe('_.camelizeKeys(object)', () => {

  let object = {
    key: 1,
    "kebab-key": "2",
    snake_key: 'three',
    camelKey: 'cu4tro',
    nested: {
      key: 'nested.1',
      'kebab-key': 'nested.2',
      snake_key: 'nested.tree',
      camelKey: 'neste.cu4tro'
    }
  }
  let camelized = _.camelizeKeys(object)


  describe('with kebab-case keys', () => {
    it('camelizes keys', () => {
      expect(camelized.kebabKey).to.equal(object['kebab-key'])
      expect(_.has(camelized, 'kebab-key')).to.be.false
    })

    it('camelizes nested keys', () => {
      expect(_.get(camelized, 'nested.kebabKey')).to.equal(_.get(object, 'nested.kebab-key'))
      expect(_.has(camelized, 'nested.kebab-key')).to.be.false
    })
  })

  describe('with snake_case keys', () => {
    it('camelizes keys', () => {
      expect(camelized.snakeKey).to.equal(object['snake_key'])
      expect(_.has(camelized, 'snake_key')).to.be.false
    })

    it('camelizes nested keys', () => {
      expect(_.get(camelized, 'nested.snakeKey')).to.equal(_.get(object, 'nested.snake_key'))
      expect(_.has(camelized, 'nested.snake_key')).to.be.false
    })
  })

  describe('with camelCase keys', () => {
    it('does not change keys', () => {
      expect(camelized.camelKey).to.equal(object['camelKey'])
      expect(_.has(camelized, 'camelKey')).to.be.true
    })

    it('does not change nested keys', () => {
      expect(_.get(camelized, 'nested.camelKey')).to.equal(_.get(object, 'nested.camelKey'))
      expect(_.has(camelized, 'nested.camelKey')).to.be.true
    })
  })

})
