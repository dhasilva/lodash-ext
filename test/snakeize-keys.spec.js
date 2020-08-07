// _ already global

describe('_.snakeizeKeys(object)', () => {

  let object = {
    key: 1,
    "kebab-key": "2",
    snake_key: 'three',
    camelKey: 'cu4tro',
    nested: {
      key: 'nested.1',
      'kebab-key': 'nested.2',
      snake_key: 'nested.tree',
      camelKey2: 'nested.cu4tro'
    }
  }
  let snakeizes = _.snakeizeKeys(object)


  describe('with kebab-case keys', () => {
    it('snakeizes keys', () => {
      expect(snakeizes.kebab_key).to.equal(object['kebab-key'])
      expect(_.has(snakeizes, 'kebab-key')).to.be.false
    })

    it('snakeizes nested keys', () => {
      expect(_.get(snakeizes, 'nested.kebab_key')).to.equal(_.get(object, 'nested.kebab-key'))
      expect(_.has(snakeizes, 'nested.kebab-key')).to.be.false
    })
  })

  describe('with snake_case keys', () => {
    it('does not change keys', () => {
      expect(snakeizes.snake_key).to.equal(object['snake_key'])
      expect(_.has(snakeizes, 'snake_key')).to.be.true
    })

    it('does not change nested keys', () => {
      expect(_.get(snakeizes, 'nested.snake_key')).to.equal(_.get(object, 'nested.snake_key'))
      expect(_.has(snakeizes, 'nested.snake_key')).to.be.true
    })
  })

  describe('with camelCase keys', () => {
    it('snakeizes keys', () => {
      expect(snakeizes.camel_key).to.equal(object['camelKey'])
      expect(_.has(snakeizes, 'camelKey')).to.be.false
    })

    it('snakeizes nested keys', () => {
      expect(_.get(snakeizes, 'nested.camel_key2')).to.equal(_.get(object, 'nested.camelKey2'))
      expect(_.has(snakeizes, 'nested.camelKey2')).to.be.false
    })
  })

})
