export interface Logger {
  fatal (..._: any[]): void
  error (..._: any[]): void
  warn (..._: any[]): void
  info (..._: any[]): void
  debug (..._: any[]): void
  trace (..._: any[]): void
}

interface Serialiser {
  serialise (value?: any): any
}

export class SerialisingLogger implements Logger {
  constructor (private readonly wrappedLogger: Logger, private readonly serialiser: Serialiser) {}

  fatal (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.fatal(...serialisedValues)
  }

  error (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.error(...serialisedValues)
  }

  warn (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.warn(...serialisedValues)
  }

  info (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.info(...serialisedValues)
  }

  debug (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.debug(...serialisedValues)
  }

  trace (...args: any[]): void {
    const serialisedValues = this.serialiseArgs(args)
    this.wrappedLogger.trace(...serialisedValues)
  }

  private serialiseArgs (args: any[]): any[] {
    const serialisedValues: any[] = []
    args.forEach((arg) => {
      const serialisedArg = this.serialiser.serialise(arg)
      serialisedValues.push(serialisedArg)
    })
    return serialisedValues
  }
}
