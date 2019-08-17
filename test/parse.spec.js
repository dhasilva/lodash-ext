// _ already global

describe('_.parse(object, as, options = {})', () => {

  // boolean
  // float
  // integer
  // json
  // string


  context('with scalar values', () => {

    // boolean
    context('boolean', () => {
      context('true value', () => {
        let value = true

        context('parsing as boolean', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'boolean')).to.eq(value)
          })
        })

        context('parsing as float', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'float')).to.be.undefined
          })
        })

        context('parsing as integer', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'integer')).to.be.undefined
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('true')
          })
        })
      }) // [end] true


      context('false value', () => {
        let value = false

        context('parsing as boolean', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'boolean')).to.eq(value)
          })
        })

        context('parsing as float', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'float')).to.be.undefined
          })
        })

        context('parsing as integer', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'integer')).to.be.undefined
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('false')
          })
        })
      }) // [end] false

    }) // [end] boolean


    // float
    context('float', () => {

      context('positive value', () => {
        let value = 12.9

        context('parsing as boolean', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'boolean')).to.be.undefined
          })
        })

        context('parsing as float', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'float')).to.equal(value)
          })
        })

        context('parsing as integer', () => {
          it('returns its integer approximation', () => {
            expect(_.parse(value, 'integer')).to.equal(12)
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('12.9')
          })
        })
      }) // [end] positive value


      context('negative value', () => {
        let value = -32.11

        context('parsing as boolean', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'boolean')).to.be.undefined
          })
        })

        context('parsing as float', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'float')).to.equal(value)
          })
        })

        context('parsing as integer', () => {
          it('returns its integer approximation', () => {
            expect(_.parse(value, 'integer')).to.equal(-32)
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('-32.11')
          })
        })
      }) // [end] negative value

    }) // [end] float


    // integer
    context('integer', () => {
      context('positive value', () => {
        let value = 12

        context('parsing as boolean', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'boolean')).to.be.undefined
          })
        })

        context('parsing as float', () => {
          it('returns its float representation', () => {
            expect(_.parse(value, 'float')).to.equal(12.0)
          })
        })

        context('parsing as integer', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'integer')).to.equal(value)
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('12')
          })
        })
      }) // [end] positive value

      context('negative value', () => {
        let value = -7

        context('parsing as boolean', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'boolean')).to.be.undefined
          })
        })

        context('parsing as float', () => {
          it('returns its float representation', () => {
            expect(_.parse(value, 'float')).to.equal(-7.0)
          })
        })

        context('parsing as integer', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'integer')).to.equal(value)
          })
        })

        context('parsing as json', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'json')).to.eq(value)
          })
        })

        context('parsing as string', () => {
          it('returns its string representation', () => {
            expect(_.parse(value, 'string')).to.equal('-7')
          })
        })
      })

    }) // [end] integer


    // string
    context('string', () => {

      context('a "boolean" value', () => {
        context('"true"', () => {
          let value = 'true'

          context('parsing as boolean', () => {
            it('returns true', () => {
              expect(_.parse(value, 'boolean')).to.eq(true)
            })
          })

          context('parsing as float', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'float')).to.be.undefined
            })
          })

          context('parsing as integer', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'integer')).to.be.undefined
            })
          })

          context('parsing as json', () => {
            it('returns true (boolean)', () => {
              expect(_.parse(value, 'json')).to.eq(true)
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] "true"


        context('"false"', () => {
          let value = "false"

          context('parsing as boolean', () => {
            it('returns false', () => {
              expect(_.parse(value, 'boolean')).to.eq(false)
            })
          })

          context('parsing as float', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'float')).to.be.undefined
            })
          })

          context('parsing as integer', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'integer')).to.be.undefined
            })
          })

          context('parsing as json', () => {
            it('returns false (boolean)', () => {
              expect(_.parse(value, 'json')).to.eq(false)
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] "false"

      }) // [end] a "boolean" value


      context('a "float" value', () => {

        context('positive value', () => {
          let value = "12.9"

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'float')).to.equal(12.9)
            })
          })

          context('parsing as integer', () => {
            it('returns its integer approximation', () => {
              expect(_.parse(value, 'integer')).to.equal(12)
            })
          })

          context('parsing as json', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'json')).to.equal(12.9)
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal('12.9')
            })
          })
        }) // [end] positive value


        context('negative value', () => {
          let value = '-32.11'

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'float')).to.equal(-32.11)
            })
          })

          context('parsing as integer', () => {
            it('returns its integer approximation', () => {
              expect(_.parse(value, 'integer')).to.equal(-32)
            })
          })

          context('parsing as json', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'json')).to.eq(-32.11)
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] negative value

      }) // [end] a "float" value


      context('an "integer" (all digits) value', () => {

        context('positive value', () => {
          let value = '12'

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'float')).to.equal(12.0)
            })
          })

          context('parsing as integer', () => {
            it('returns its integer representation', () => {
              expect(_.parse(value, 'integer')).to.equal(12)
            })
          })

          context('parsing as json', () => {
            it('returns its integer representation', () => {
              expect(_.parse(value, 'json')).to.eq(12)
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] positive value

        context('negative value', () => {
          let value = '-7'

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns its float representation', () => {
              expect(_.parse(value, 'float')).to.equal(-7.0)
            })
          })

          context('parsing as integer', () => {
            it('returns its integer representation', () => {
              expect(_.parse(value, 'integer')).to.equal(-7)
            })
          })

          context('parsing as json', () => {
            it('returns its integer representation', () => {
              expect(_.parse(value, 'json')).to.equal(-7)
            })
          })

          context('parsing as string', () => {
            it('returns itsself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })

        }) // [end] negative value

      }) // [end] an "integer" value


      context('a "json" value', () => {
        context('array', () => {
          let value = '[ 1, { "a": -2.33, "not": null }, [ true, false ] ]'

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'float')).to.be.undefined
            })
          })

          context('parsing as integer', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'integer')).to.be.undefined
            })
          })

          context('parsing as json', () => {
            it('returns its array representation', () => {
              expect(_.parse(value, 'json')).to.have
                .deep.ordered.members([ 1, { "a": -2.33, "not": null }, [ true, false ] ])
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] "true"


        context('"object"', () => {
          let value = '{ "first": 1, "2": [ 1, "not", null ], "nested": [ true, false ] }'

          context('parsing as boolean', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'boolean')).to.be.undefined
            })
          })

          context('parsing as float', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'float')).to.be.undefined
            })
          })

          context('parsing as integer', () => {
            it('returns undefined', () => {
              expect(_.parse(value, 'integer')).to.be.undefined
            })
          })

          context('parsing as json', () => {
            it('returns its object representation', () => {
              expect(_.parse(value, 'json')).to
                .deep.equal({ "first": 1, "2": [ 1, "not", null ], "nested": [ true, false ] })
            })
          })

          context('parsing as string', () => {
            it('returns itself', () => {
              expect(_.parse(value, 'string')).to.equal(value)
            })
          })
        }) // [end] "false"

      }) // [end] a "json" value


      context('a "text" value (alphanumeric and symbols)', () => {
        let value = "+12.9-some_TEXT.in@here/AlR1Gh7?!"

        context('parsing as boolean', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'boolean')).to.be.undefined
          })
        })

        context('parsing as float', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'float')).to.be.undefined
          })
        })

        context('parsing as integer', () => {
          it('returns undefined', () => {
            expect(_.parse(value, 'integer')).to.be.undefined
          })
        })

        context('parsing as json', () => {
          it('returns undefined (string is too weird to parse)', () => {
            expect(_.parse(value, 'json')).to.be.undefined
          })
        })

        context('parsing as string', () => {
          it('returns itself', () => {
            expect(_.parse(value, 'string')).to.equal(value)
          })
        })
      }) // [end] positive value

    }) // [end] string

  }) // [end] with scalar values



  context('with objects', () => {
    it("parses every value as specified type", () => {
      let obj = {
        a: 1,
        b: {
          'nested': 2,
          'string': 'string-o-crazy'
        },
        c: ['3', 4.1, 5.0]
      }

      expect(_.parse(obj, 'float')).to.deep.equal({
        a: 1.0,
        b: {
          nested: 2.0,
          string: undefined
        },
        c: [3.0, 4.1, 5.0]
      })
    })
  })

  context('with arrays', () => {
    it("parses every value as type", () => {
      let obj = [
        1,
        {
          'nested': 2,
          'string': 'string-o-crazy'
        },
        ['3', 4.1, 5.0]
      ]

      expect(_.parse(obj, 'string')).to.have.deep.members([
        '1',
        {
          'nested': '2',
          'string': 'string-o-crazy'
        },
        ['3', '4.1', '5']
      ])
    })
  })


  context('custom parsing', () => {
    it('allows "overriding" parsers for default "types"', () => {
      _.parse.use({
        boolean(val) { return !!val }
      })

      // using custom parser, "false" is coerced to true (boolean)
      expect(_.parse('false', 'boolean')).to.eq(true)

      _.parse.remove('boolean')

      // back to default parser, "false" is parsed as false (boolean)
      expect(_.parse('false', 'boolean')).to.eq(false)

      // and it won't remove the "default" 'boolean' parser
      expect(() => _.parse.remove('boolean')).to.throw()
    })

    it('allows extending parsers with custom "types"', () => {
      // parsers custom options: a map of <name, parse function>
      _.parse.use({
        // parse fn signature: function (value, options = {})
        digits(value, options = {}) {
          return `${value}`.replace(/\D/g,'')
        }
      })

      expect(_.parse('a-z123%$#../4-5asdf6/7__8', 'digits')).to.equal('12345678')

      // removing custom parser
      _.parse.remove('digits')
      expect(() => _.parse('a-z123%$#../4-5asdf6/7__8', 'digits')).to.throw()

      // and when trying to remove an already removed custom parser
      expect(() => _.parse.remove('digits')).to.throw()
    })
  })

})
