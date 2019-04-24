import * as restify from 'restify'
import { MongoClient, ObjectId } from 'mongodb'

const dbUrl = 'mongodb://root:example@localhost'
const dbName = 'api'
const indexRegex = /^[a-f\d]{24}$/i

export const get = (req: restify.Request, res: restify.Response, next: restify.Next) => {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, async (err, client) => {
    res.header("Access-Control-Allow-Origin", "*")
    try {
      if (err) throw err
      const id = req.params.id
      console.log(id)

      if (!indexRegex.test(id)) {
        res.send(400, 'Wrong index format')
      } else {
        const objectId = new ObjectId(id)
        const db = client.db(dbName)
        const collection = db.collection('rosters')
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
