import { expect } from 'chai'
import { Gen } from 'verify-it'
import { ConfigurationParser } from '../../src/config/ConfigurationParser'
import { Configuration } from '../../src/config/Configuration'

describe('ConfigurationParser', () => {
  describe('parse', () => {
    verify.it('fails if api config does not exist', () => {
      expect(() => ConfigurationParser.parse(Gen.object()))
        .to.throw(ConfigurationParser.ParseError, '"api" is required')
    })

    verify.it('fails if api config is not a valid object', () => {
      expect(() => ConfigurationParser.parse({
        api: Gen.string()
      })).to.throw(ConfigurationParser.ParseError, '"api" must be an object')
    })

    verify.it('fails if api port number does not exist', () => {
      const configData = {
        api: { }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"port" is required')
    })

    verify.it('fails if the api port is not a valid number', () => {
      const configData = {
        api: {
          port: Gen.string()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"port" must be a number')
    })

    verify.it('fails if log config does not exist', () => {
      const configData = {
        api: {
          port: Gen.integer()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"log" is required')
    })

    verify.it('fails if log config is not a valid object', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: Gen.string()
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"log" must be an object')
    })

    verify.it('fails if log name does not exist', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {}
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"name" is required')
    })

    verify.it('fails if log name is not a valid string', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.object()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"name" must be a string')
    })

    verify.it('fails if log level does not exist', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"level" is required')
    })

    verify.it('fails if log level is not a valid string', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.object()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"level" must be a string')
    })

    verify.it('fails if log streams is provided but is not an array', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          streams: Gen.string()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"streams" must be an array')
    })

    verify.it('fails if log streams is provided but is not an array of objects', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          streams: Gen.array(Gen.string, Gen.integerBetween(1, 10)())()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"streams" at position 0 fails')
    })

    verify.it('fails if log streams provided do not contain a path', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          streams: Gen.array(Gen.object, Gen.integerBetween(1, 10)())()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"path" is required')
    })

    verify.it('fails if log streams paths provided are not valid strings', () => {
      const generateInvalidStream = () => {
        return {
          path: Gen.object()
        }
      }
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          streams: Gen.array(generateInvalidStream, Gen.integerBetween(1, 10)())()
        }
      }
      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, '"path" must be a string')
    })

    verify.it('fails if config contains unrecognised data', Gen.string, (invalidKey) => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string()
        },
        [invalidKey]: Gen.string()
      }

      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, `"${invalidKey}" is not allowed`)
    })

    verify.it('fails if config contains unrecognised data in the api config', Gen.string, (invalidKey) => {
      const configData = {
        api: {
          port: Gen.integer(),
          [invalidKey]: Gen.string()
        },
        log: {
          name: Gen.string(),
          level: Gen.string()
        }
      }

      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, `"${invalidKey}" is not allowed`)
    })

    verify.it('fails if config contains unrecognised data in the log config', Gen.string, (invalidKey) => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          [invalidKey]: Gen.string()
        }
      }

      expect(() => ConfigurationParser.parse(configData))
        .to.throw(ConfigurationParser.ParseError, `"${invalidKey}" is not allowed`)
    })

    verify.it('returns a valid Configuration without when it does not contain log streams', () => {
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string()
        }
      }

      const config: Configuration = ConfigurationParser.parse(configData)
      config.should.eql(configData)
    })

    verify.it('returns a valid Configuration when it contains log streams', () => {
      const generateStream = () => {
        return {
          path: Gen.string()
        }
      }
      const configData = {
        api: {
          port: Gen.integer()
        },
        log: {
          name: Gen.string(),
          level: Gen.string(),
          streams: Gen.array(generateStream, Gen.integerBetween(1, 10)())()
        }
      }

      const config: Configuration = ConfigurationParser.parse(configData)
      config.should.eql(configData)
    })
  })
})
