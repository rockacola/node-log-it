import * as loglevel from 'loglevel'
import * as moment from 'moment'
import { assign } from 'lodash'

interface Options {
  level?: loglevel.LogLevelDesc,
  displayTimestamp?: boolean,
  displayName?: boolean,
  displayLevel?: boolean,
  useLevelInitial?: boolean,
  useLocalTime?: boolean,
  timestampFormat?: string,
}

class Logger {
  private name: string
  private options: Options
  private logger: loglevel.Logger

  constructor(name: string, options: Options = {}) {
    // Associate required properties
    this.name = name

    // Associate optional properties
    this.options = {
      level: loglevel.levels.WARN,
      displayTimestamp: true,
      displayName: true,
      displayLevel: true,
      useLevelInitial: false,
      useLocalTime: false,
      timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
    }
    assign(this.options, options)

    // Validation
    this.validateName(this.name)
    this.validateLogLevel(this.options.level)

    // Bootstrapping
    this.logger = loglevel.getLogger(this.name)
    this.logger.setLevel(<loglevel.LogLevelDesc> this.options.level)
  }

  static get levels(): loglevel.LogLevel {
    return loglevel.levels
  }

  getName(): string {
    return this.name
  }

  getLevel(): number {
    return <number> this.options.level
  }

  setLevel(level: loglevel.LogLevelDesc) {
    this.logger.setLevel(level)
  }

  trace() {
    const args = this.manipulateArguments(arguments, 'trace')
    this.logger.trace.apply(this, args)
  }

  debug () {
    const args = this.manipulateArguments(arguments, 'debug')
    this.logger.debug.apply(this, args)
  }

  info () {
    const args = this.manipulateArguments(arguments, 'info')
    this.logger.info.apply(this, args)
  }

  warn () {
    const args = this.manipulateArguments(arguments, 'warn')
    this.logger.warn.apply(this, args)
  }

  error () {
    const args = this.manipulateArguments(arguments, 'error')
    this.logger.error.apply(this, args)
  }

  private manipulateArguments (argumentsObject: any, levelText: string): any {
    let args = Array.prototype.slice.call(argumentsObject)

    // Prepend items in reverse order
    if (this.options.displayLevel) {
      const levelLabel = this.getLevelLabel(levelText)
      args.unshift('\x1b[1m' + levelLabel + '\x1b[0m')
    }
    if (this.options.displayName) {
      args.unshift('\x1b[36m' + this.name + '\x1b[0m')
    }
    if (this.options.displayTimestamp) {
      const tsLabel = this.getTimestampLabel()
      args.unshift('\x1b[2m' + tsLabel + '\x1b[0m')
    }

    return args
  }

  private getLevelLabel(levelText: string): string {
    if (this.options.useLevelInitial) {
      return levelText.charAt(0).toUpperCase()
    } else {
      return levelText + ':'
    }
  }

  private getTimestampLabel(): string {
    if (this.options.useLocalTime) {
      return moment().format(this.options.timestampFormat)
    } else {
      return moment.utc().format(this.options.timestampFormat)
    }
  }

  private validateName(name: string | undefined) {
    if (!name) {
      throw new Error('Unspecified log name.')
    }
  }

  private validateLogLevel(level: loglevel.LogLevelDesc | undefined) {
    if (level === undefined) {
      throw new Error('Unspecified log level.')
    }
  }
}

export default Logger
