import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.DB_PATH
  ? process.env.DB_PATH
  : 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'statusHistory'

export async function main() {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Connected successfully to server')
  const db = client.db(dbName)
  const collection = db.collection('documents')

  // the following code examples can be pasted here...

  return 'done.'
}
