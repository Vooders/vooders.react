import * as restify from 'restify'

export const get = (_: restify.Request, res: restify.Response, next: restify.Next) => {
  res.send(200, 'OK')
  next()
}
