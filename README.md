# node-log-it

A simple multi-level logger for node.js console.

## Installation

```js
npm install node-log-it
```

## Usage

Reference:

```js
const Logger = require('node-log-it').default
```

or

```js
import Logger from 'node-log-it'
```

Usage:

```js
const logger = new Logger('example-2', { level: 'info' })
logger.info('Hello', 'World')
```

## Examples

Run a JavaScript example:

```js
node examples/basic.js
```

Run a TypeScript example:

```js
./node_modules/.bin/ts-node examples/typescript.ts
```
