import * as path from 'path'
import { readFileSync, PathLike } from 'fs'

type ReadFileFunction = (path: PathLike, options: { readonly encoding: string }) => string

export type ConfigurationParser<TypedConfig> = (rawConfig: any) => TypedConfig

export class ConfigurationLoader<TypedConfig> {
  constructor (
    private readonly parser: ConfigurationParser<TypedConfig>,
    private readonly readFile: ReadFileFunction = readFileSync
  ) {}

  load (filename: string): TypedConfig {
    if (!filename) {
      throw new ConfigurationLoader.LoadError('Filename is missing')
    }

    const configObject = this.readConfigFile(filename)
    return this.parser(configObject)
  }

  private readConfigFile (filename: string): object {
    const configFilePath = path.join(__dirname, '..', '..', '..', 'configuration', `${filename}.json`)
    try {
      return JSON.parse(
        this.readFile(configFilePath, { encoding: 'utf-8' })
      )
    } catch (error) {
      throw new ConfigurationLoader.LoadError(`Unable to load configuration file '${configFilePath}'`, error)
    }
  }
}

export namespace ConfigurationLoader {
  export class LoadError extends Error {
    constructor (message: string, readonly cause?: Error) {
      super(message)
      this.name = this.constructor.name
    }
  }
}
