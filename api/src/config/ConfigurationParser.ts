import * as Joi from 'joi'
import { Configuration } from './Configuration'

export class ConfigurationParser {
  private static readonly SCHEMA: Joi.SchemaLike = ConfigurationParser.generateSchema()

  static parse (rawConfig: any): Configuration {
    const { error } = Joi.validate(rawConfig, ConfigurationParser.SCHEMA, { presence: 'required', allowUnknown: false })
    if (error) {
      throw new ConfigurationParser.ParseError(`The provided config does not match the schema: ${error.message}`)
    } else {
      return rawConfig
    }
  }

  private static generateSchema () {
    return {
      api: Joi.object({
        port: Joi.number()
      }),
      log: Joi.object({
        name: Joi.string(),
        level: Joi.string(),
        streams: Joi.array().items(Joi.object({
          path: Joi.string()
        })).optional()
      })
    }
  }
}

export namespace ConfigurationParser {
  export class ParseError extends Error {
    constructor (message: string) {
      super(message)
      this.name = this.constructor.name
    }
  }
}
