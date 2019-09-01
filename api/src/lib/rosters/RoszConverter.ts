import * as decompress from 'decompress'
import { Xml2Json } from './Xml2Json'
import { JsonTransformer } from './JsonTransformer'
import * as assert from 'assert'
import { MongoClient } from 'mongodb'

const dbUrl = 'mongodb://root:example@localhost'
const dbName = 'api'

const dir = process.env['ROSTER_DIR']
if (!dir) throw new Error('no dir set!')
const filename = 'TestRoster.rosz'

async function convertAndSave () {
  try {
    const file = await decompress(`${dir}${filename}`)
    const json = await Xml2Json.parseBuffer(file[0].data)
    // console.log(JSON.stringify(json, null, 2))
    const transformedJson = JsonTransformer.transform(json)
    // console.log(JSON.stringify(transformedJson, null, 2))
    insert(transformedJson)
  } catch(error) {
    console.log(error)
  }
}

const insert = async (document: object) => {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, async (err, client) => {
    assert.equal(null, err)
    const db = client.db(dbName)
    const collection = db.collection('rosters')
    await collection.insertOne(document)
    client.close()
  })
}

convertAndSave()
