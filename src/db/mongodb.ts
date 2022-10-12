import { model, connect } from 'mongoose'
import { statusSchema } from './schema'
import { Status } from '../@types'

const Status = model<Status>('User', statusSchema)

// Connection URL
const url = process.env.DB_PATH
  ? process.env.DB_PATH
  : 'mongodb://localhost:27017/statusHistory'

export async function connection() {
  await connect(url)
  console.log('Connected to mongodb')
}
