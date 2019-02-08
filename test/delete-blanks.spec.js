// _ already global

describe('_.deleteBlanks(object)', () => {

  it('deletes blank values from array', () => {
    let array = ['', 0, [], 'string']
    expect(_.deleteBlanks(array)).to.deep.equal([0, 'string'])
  })

  it('delete keys with blank values', () => {
    let object = {
      value1: "val1",
      value2: undefined,
      value3: null,
      value4: {},
      nested: {
        value1: 0,
        value2: false,
        value3: [],
        value4: '  ',
      },
      array: ['', 0, true]
    }
    let pruned = _.deleteBlanks(object)

    expect(pruned).to.deep.equal({
      value1: 'val1',
      nested: {
        value1: 0,
        value2: false
      },
      array: [0, true]
    })
  })

})
