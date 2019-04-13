import * as restify from 'restify'
import * as StatusApi from './StatusApi'

export class ServerFactory {
  static createServer (): restify.Server {
    const server = restify.createServer({ name: 'api.vooders.com' })
    server.get('/status', StatusApi.get)

    return server
  }
}
