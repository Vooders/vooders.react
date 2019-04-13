import { Gen } from 'verify-it'
import { expect } from 'chai'
import { ConfigurationLoader } from '../../src/config/ConfigurationLoader'
import * as testdouble from 'testdouble'

describe('ConfigurationLoader', () => {
  const fakeParser = () => undefined

  const generateFileReader = (fileContent: string = '{}') => {
    const fileReader = testdouble.function() as any
    testdouble.when(fileReader(testdouble.matchers.anything(), testdouble.matchers.anything()))
      .thenReturn(fileContent)
    return fileReader
  }

  beforeEach(() => {
    testdouble.config({ ignoreWarnings: true })
  })

  afterEach(() => {
    testdouble.config({ ignoreWarnings: false })
  })

  describe('load', () => {
    verify.it('throws an error if no filename is provided', () => {
      const configurationLoader = new ConfigurationLoader(fakeParser)
      expect(() => {
        configurationLoader.load('')
      }).to.throw(ConfigurationLoader.LoadError, 'Filename is missing')
    })

    verify.it('calls the file reader with the correct path', Gen.string, (filename) => {
      const fileReader = generateFileReader()
      const configurationLoader = new ConfigurationLoader(fakeParser, fileReader)
      configurationLoader.load(filename)
      testdouble.verify(fileReader(testdouble.matchers.contains(`${filename}.json`), { encoding: 'utf-8' }))
    })

    verify.it('returns any errors from the file reader', Gen.error, Gen.string, (error, filename) => {
      const fileReader = testdouble.function() as any
      testdouble.when(fileReader(testdouble.matchers.anything(), testdouble.matchers.anything()))
        .thenThrow(error)
      const configurationLoader = new ConfigurationLoader(fakeParser, fileReader)
      expect(() => {
        configurationLoader.load(filename)
      }).to.throw(ConfigurationLoader.LoadError, `${filename}.json`)
    })

    verify.it('throws an error if the config file does not contain valid json', Gen.string, Gen.string, (fileContent, filename) => {
      const fileReader = generateFileReader(fileContent)
      const configurationLoader = new ConfigurationLoader(fakeParser, fileReader)
      expect(() => {
        configurationLoader.load(filename)
      }).to.throw(ConfigurationLoader.LoadError, `${filename}.json`)
    })

    verify.it('calls the parser with the config file json content', Gen.string, Gen.object, (filename, configObject) => {
      const fileReader = generateFileReader(JSON.stringify(configObject))
      const parser = testdouble.function() as any
      const configurationLoader = new ConfigurationLoader(parser, fileReader)
      configurationLoader.load(filename)
      testdouble.verify(parser(configObject))
    })

    verify.it('should return any errors from the parser function', Gen.string, Gen.error, (filename, error) => {
      const fileReader = generateFileReader()
      const parser = testdouble.function() as any
      testdouble.when(parser(testdouble.matchers.anything()))
        .thenThrow(error)
      const configurationLoader = new ConfigurationLoader(parser, fileReader)
      expect(() => {
        configurationLoader.load(filename)
      }).to.throw(error)
    })

    verify.it('returns the result of the parser function', Gen.string, Gen.object, (filename, configObject) => {
      const fileReader = generateFileReader(JSON.stringify(configObject))
      const parser = testdouble.function() as any
      testdouble.when(parser(testdouble.matchers.anything()))
        .thenReturn(configObject)
      const configurationLoader = new ConfigurationLoader(parser, fileReader)
      configurationLoader.load(filename).should.eql(configObject)
    })
  })
})
