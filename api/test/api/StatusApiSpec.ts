import * as supertest from 'supertest'
import { ServerFactory } from '../../src/api/ServerFactory'

describe('/status', () => {
  it('should return "OK" and 200 status', () => {
    const server = ServerFactory.createServer()
    return supertest(server)
      .get('/status')
      .expect(200, '"OK"')
  })
})
