export class LoggingSerialiser {
  static serialise (value?: any): any {
    if (!value || !value.stack) {
      return value
    } else {
      return LoggingSerialiser.serialiseError(value)
    }
  }

  private static serialiseError (error: any) {
    const serialised: any = {
      message: error.message,
      name: error.name,
      stack: error.stack
    }

    Object.keys(error).forEach((key) => {
      serialised[key] = LoggingSerialiser.serialise(error[key])
    })
    return serialised
  }
}
