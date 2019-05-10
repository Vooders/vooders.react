import * as restify from 'restify'
import { MongoClient, ObjectId } from 'mongodb'

const dbConfig = {
  url: 'mongodb://root:example@localhost',
  name: 'api',
  collection: 'rosters'
}

const indexRegex = /^[a-f\d]{24}$/i

export const get = (req: restify.Request, res: restify.Response, next: restify.Next) => {
  MongoClient.connect(dbConfig.url, { useNewUrlParser: true }, async (err, client) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
      if (err) throw err
      const id = req.params.id
      if (!indexRegex.test(id)) {
        res.send(400, 'Wrong index format')
      } else {
        const objectId = new ObjectId(id)
        const db = client.db(dbConfig.name)
        const collection = db.collection(dbConfig.collection)
        const roster = await collection.findOne(objectId)
        if (!roster) {
          res.send(404, 'Roster not found')
        } else {
          res.header('content-type', 'json')
          res.send(200, roster)
        }
      }
    } catch (error) {
      if (error.code === 'ECONNREFUSED'){
        res.send(500, 'Database Down')
      } else {
        res.send(500, 'Unexpected Error')
      }
    } finally {
      client.close()
      next()
    }
  })
}
