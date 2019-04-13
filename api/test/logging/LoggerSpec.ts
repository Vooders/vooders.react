import { Gen } from 'verify-it'
import * as td from 'testdouble'
import { Logger, SerialisingLogger } from '../../src/logging/Logger'
import { TestLogger } from './TestLogger'

describe('SerialisingLogger', () => {
  const genLogger = (): Logger => {
    return td.object(new TestLogger())
  }

  const genSerialiser = () => {
    return td.object({
      serialise: (value?: any): any => value
    })
  }

  const loggingMethods = [
    'fatal',
    'error',
    'warn',
    'info',
    'debug',
    'trace'
  ]

  loggingMethods.forEach((method) => {
    describe(method, () => {
      verify.it('should call the wrapped logger with no arguments if none are provided', genLogger, genSerialiser, (wrappedLogger: any, serialiser) => {
        const serialisingLogger: any = new SerialisingLogger(wrappedLogger, serialiser)
        serialisingLogger[method]()
        return td.verify(wrappedLogger[method](), { times: 1 })
      })

      verify.it('should call the serialiser for each of the supplied arguments',
        genLogger, genSerialiser, Gen.distinct(Gen.object, Gen.integerBetween(2, 10)()),
        (wrappedLogger, serialiser, args) => {
          const serialisingLogger: any = new SerialisingLogger(wrappedLogger, serialiser)
          serialisingLogger[method](...args)
          args.forEach((arg) => {
            td.verify(serialiser.serialise(arg), { times: 1 })
          })
        }
      )

      verify.it('should call the wrapped logger with the serialised arguments',
        genLogger, genSerialiser, Gen.distinct(Gen.object, 2), Gen.distinct(Gen.object, 2),
        (wrappedLogger: any, serialiser, args, serialisedArgs) => {
          args.forEach((arg, index) => {
            td.when(serialiser.serialise(arg)).thenReturn(serialisedArgs[index])
          })

          const serialisingLogger: any = new SerialisingLogger(wrappedLogger, serialiser)
          serialisingLogger[method](...args)

          const firstCaptor = td.matchers.captor()
          const secondCaptor = td.matchers.captor()
          td.verify(wrappedLogger[method](firstCaptor.capture(), secondCaptor.capture()));
          [firstCaptor.value, secondCaptor.value].should.eql(serialisedArgs)
        }
      )
    })
  })
})
