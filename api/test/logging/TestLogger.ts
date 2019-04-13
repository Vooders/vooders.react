import { Logger } from '../../src/logging/Logger'

export class TestLogger implements Logger {
  fatal (..._: any[]): void { return }
  error (..._: any[]): void { return }
  warn (..._: any[]): void { return }
  info (..._: any[]): void { return }
  debug (..._: any[]): void { return }
  trace (..._: any[]): void { return }
}
