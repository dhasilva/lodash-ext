// _ already global

import moment from 'moment'


describe('_.pickParse(object, options, *modifiers)', () => {

  it(`picks and parses`, () => {
    const ACCESS_VALUES = ['admin', 'operator', 'guest']

    let raw = {
      total: '2013.22',
      ignored: true,
      user: {
        id:            "11",
        access:        '["admin", "operator"]',
        name:          "John Doe",
        blocked:       "false",
        last_login_at: "2019-08-16T20:24:26.856Z",
        updated_at:    "2019-07-16T20:24:26.856Z"
      }
    }

    let params = _.pickParse(raw, {
      total:                'float',
      'user.id':            'integer',
      'user.access':        'json',
      'user.name':          'string',
      'user.blocked':       'boolean',
      'user.last_login_at': 'string'
     })

    // checking keys
    expect(params).to.have.keys(['total', 'user'])
    expect(params.user).to.have.keys(['id', 'access', 'name', 'blocked', 'last_login_at'])

    // checking values
    expect(params.total).to.equal(2013.22)

    expect(params.user).to.deep.equal({
      id: 11,
      access: ['admin', 'operator'],
      name: 'John Doe',
      blocked: false,
      last_login_at: "2019-08-16T20:24:26.856Z"
    })

  })

  context('using custom parsers', () => {
    const ACCESS_VALUES = ['admin', 'operator', 'guest']
    const parsers = {
      // cast 'access' with access function
      access(val, options = {}) { // cast
        return ACCESS_VALUES.includes(val) ? val : 'guest' // fallback to default 'guest'
      },

      // cast 'moment' with moment function
      moment: function parseMoment(val, options = {}) {
        return moment(val)
      },
    }

    // define custom parsers once
    before(() => {
      _.parse.use(parsers)
    })

    // clear custom parsers once
    after(() => {
      _.parse.remove(_.keys(parsers))
    })

    it(`picks and parses, using custom parsers`, () => {


      let raw = {
        total: '2013.22',
        ignored: true,
        user: {
          id:            "11",
          access:        "invalid",
          name:          "John Doe",
          blocked:       "false",
          last_login_at: "2019-08-16T20:24:26.856Z",
          updated_at:    "2019-07-16T20:24:26.856Z"
        }
      }

      let params = _.pickParse(raw, {
        total:                'float',
        'user.id':            'integer',
        'user.access':        'access',   // custom parsing
        'user.name':          'string',
        'user.blocked':       'boolean',
        'user.last_login_at': 'moment'    // custom parsing
      })

      // retornará a propriedade 'number' parseada como 'integer' (usando `asInteger`)

      // checking keys
      expect(params).to.have.keys(['total', 'user'])
      expect(params.user).to.have.keys(['id', 'access', 'name', 'blocked', 'last_login_at'])

      // checking values
      expect(params.total).to.equal(2013.22)

      expect(params.user).to.deep.equal({
        id: 11,
        access: 'guest',
        name: 'John Doe',
        blocked: false,
        last_login_at: moment(raw.user.last_login_at)
      })

    })
  })

})
