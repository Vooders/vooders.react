import * as decompress from 'decompress'
import { Xml2Json } from './Xml2Json'
import { JsonTransformer } from './JsonTransformer'
// import * as assert from 'assert'
// import { MongoClient } from 'mongodb'

// const dbUrl = 'mongodb://localhost'
// const dbName = 'api'


const dir = '/home/vooders/BattleScribe/rosters/'
const filename = 'death-guard-1.4k-v2.rosz'


async function convertAndSave () {
  try {
    const file = await decompress(`${dir}${filename}`)
    const json = await Xml2Json.parseBuffer(file[0].data)
    const transformedJson = JsonTransformer.transform(json)
    console.log(JSON.stringify(transformedJson, null, 2))
  } catch(error) {
    console.log(error)
  }
}

// const insert = (document: object) => {
//   MongoClient.connect(dbUrl, { useNewUrlParser: true }, async (err, client) => {
//     assert.equal(null, err)
//     const db = client.db(dbName)
//     const collection = db.collection('rosters')
//     await collection.insertOne(document)
//   })
// }

convertAndSave()
