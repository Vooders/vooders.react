import * as mongoose  from 'mongoose'

const mongo_uri = 'mongodb://localhost:8081/admin'

async function connect () {
  try {
    await mongoose.connect(`${mongo_uri}`, { useNewUrlParser: true })
  } catch (error) {
    console.log('boom!', error)
  }
}

connect()
