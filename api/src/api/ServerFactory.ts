import * as restify from 'restify'
import * as StatusApi from './StatusApi'
import * as RosterApi from './RosterApi'

export class ServerFactory {
  static createServer (): restify.Server {
    const server = restify.createServer({ name: 'api.vooders.com' })
    server.get('/status', StatusApi.get)
    server.get('/roster/:id', RosterApi.get)
    return server
  }
}
