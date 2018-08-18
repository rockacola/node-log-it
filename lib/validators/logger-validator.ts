import { LogLevelDesc } from 'loglevel'

class LoggerValidator {
  static validateName(name: string | undefined) {
    if (!name) {
      throw new Error('Unspecified log name.')
    }
  }

  static validateLogLevel(level: LogLevelDesc | undefined) {
    if (level === undefined) {
      throw new Error('Unspecified log level.')
    }
  }
}

export default LoggerValidator
