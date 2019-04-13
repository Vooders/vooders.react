import * as Bunyan from 'bunyan'

export type Configuration = {
  readonly api: {
    readonly port: number
  }
  readonly log: Bunyan.LoggerOptions
}
