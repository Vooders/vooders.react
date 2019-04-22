import { ServerFactory } from './src/api/ServerFactory'
import * as cluster from 'cluster'
import { cpus } from 'os'
import * as Bunyan from 'bunyan'
import { SerialisingLogger } from './src/logging/Logger'
import { LoggingSerialiser } from './src/logging/LoggingSerialiser'
import { Configuration } from './src/config/Configuration'
import { ConfigurationParser } from './src/config/ConfigurationParser'
import { ConfigurationLoader } from './src/config/ConfigurationLoader'

const configurationLoader = new ConfigurationLoader(ConfigurationParser.parse)
const config: Configuration = configurationLoader.load('app')

const numberOfWorkers = cpus().length

const bunyan: Bunyan = Bunyan.createLogger(config.log)
const logger = new SerialisingLogger(bunyan, LoggingSerialiser)

if (cluster.isMaster) {
  logger.info(`Master ${process.pid} is running`)

  new Array(numberOfWorkers).fill(0).forEach(() => cluster.fork())

  cluster.on('exit', (worker) => {
    logger.error(`worker ${worker.process.pid} died. Respawning...`)
    cluster.fork()
  })
} else {
  logger.info(`Starting worker process ${process.pid}`)
  const apiServer = ServerFactory.createServer()
  apiServer.listen(config.api.port, () => {
    logger.info(`${apiServer.name} ${process.pid} listening at ${apiServer.url}`)
  })
}
console.log('server up!')
