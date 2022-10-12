import { model, connect } from 'mongoose'
import { statusSchema } from './schema'
import { Status } from '../@types'

const Status = model<Status>('User', statusSchema)

// Connection URL
const url = process.env.DB_PATH
  ? process.env.DB_PATH
  : 'mongodb://localhost:27017/statusHistory'

export async function connection() {
  try {
    await connect(url)
    console.log('Connected to mongodb')
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}
export async function insert(status: Status): Promise<string> {
  try {
    const input = new Status(status)
    await input.save()
    console.log('New status inserted in MongoDB')
    return 'New status inserted in MongoDB'
  } catch (error) {
    console.log(`MongoDB insert error: ${error}`)
    return `MongoDB insert error: ${error}`
  }
}
