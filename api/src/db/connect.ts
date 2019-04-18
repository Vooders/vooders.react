import * as mongoose  from 'mongoose'

const mongo_uri = 'mongodb://localhost:27017/users'

async function connect () {
  try {
    await mongoose.connect(`${mongo_uri}`, { useNewUrlParser: true })
    console.log('connected')
  } catch (error) {
    console.log('boom!', error)
  }
}

connect()
