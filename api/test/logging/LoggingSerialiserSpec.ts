import { Gen } from 'verify-it'
import { expect } from 'chai'
import { LoggingSerialiser } from '../../src/logging/LoggingSerialiser'

describe('LoggingSerialiser', () => {
  class CustomError extends Error {
    // tslint:disable-next-line readonly-keyword
    [key: string]: any
  }

  describe('serialise', () => {
    verify.it('return undefined if supplied with undefined', () => {
      const result = LoggingSerialiser.serialise()
      return expect(result).to.be.undefined
    })

    verify.it('returns null if supplied with null', () => {
      const result = LoggingSerialiser.serialise(null)
      return expect(result).to.be.null
    })

    verify.it('returns the provided value if it has no stack', Gen.object, (value) => {
      const result = LoggingSerialiser.serialise(value)
      return expect(result).to.eql(value)
    })

    verify.it('returns the provided value if supplied with a string', Gen.string, (value) => {
      const result = LoggingSerialiser.serialise(value)
      return expect(result).to.eql(value)
    })

    verify.it('returns the provided value if supplied with a number', Gen.float, (value) => {
      const result = LoggingSerialiser.serialise(value)
      return expect(result).to.eql(value)
    })

    verify.it('returns the provided value if supplied with an array', Gen.array(Gen.string, 10), (value) => {
      const result = LoggingSerialiser.serialise(value)
      return expect(result).to.eql(value)
    })

    verify.it('returns an object when provided with an error', Gen.error, (error) => {
      const result = LoggingSerialiser.serialise(error)
      return expect(result).to.be.an('object')
    })

    verify.it('returns an object containing the message when provided with an error', Gen.error, (error) => {
      const result = LoggingSerialiser.serialise(error)
      return expect(result).to.have.property('message', error.message)
    })

    verify.it('returns an object containing the name when provided with an error', Gen.string, (name) => {
      const error = new Error()
      error.name = name
      const result = LoggingSerialiser.serialise(error)
      return expect(result).to.have.property('name', name)
    })

    verify.it('returns an object containing any additional error properties', Gen.object, Gen.string, (value, key) => {
      const error = new CustomError()
      error[key] = value
      const result = LoggingSerialiser.serialise(error)
      return expect(result).to.have.property(key, value)
    })

    verify.it('returns an object containing the stack when provided with an error', Gen.error, (error) => {
      const result = LoggingSerialiser.serialise(error)
      return expect(result).to.have.property('stack', error.stack)
    })

    verify.it('serialises any nested errors in the provided error', Gen.error, Gen.string, (nestedError, key) => {
      const error = new CustomError()
      const serialisedCause = LoggingSerialiser.serialise(nestedError)
      error[key] = nestedError

      const result = LoggingSerialiser.serialise(error)
      return result[key].should.eql(serialisedCause)
    })
  })
})
