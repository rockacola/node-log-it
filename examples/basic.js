#!/usr/bin/env node

const Logger = require('../dist/index.js').Logger

// -- Implementation

;(async () => {
  console.log('== Basic Logger Example ==')

  const logger1 = new Logger('example-1')
  logger1.info('You wont see this as the default visibility level is set to "warn".')
  logger1.warn('Warning. this is visible.')

  const logger2 = new Logger('example-2', { level: 'info' })
  logger2.info('Hello', 'World')
  logger2.info('Array test:', ['apple', 'banana', 'citrus'])
  logger2.setLevel('warn')
  logger2.info('You shouldnt see this as the visibility is now set to "warn"')

  const logger3 = new Logger('example-3', { level: Logger.levels.DEBUG })
  logger3.debug('You can also set log level via its type safe value.')
})()
