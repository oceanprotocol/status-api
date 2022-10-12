import { model, connect } from 'mongoose'
import { statusSchema } from './schema'
import { IStatus } from '../@types'

const Status = model<IStatus>('Status', statusSchema)

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

export async function insert(status: IStatus): Promise<string> {
  try {
    const input = new Status(status)
    await input.save()
    return 'New status inserted in MongoDB'
  } catch (error) {
    return `MongoDB insert error: ${error}`
  }
}

export async function getStatus(network: string) {
  try {
    const status = await Status.find({
      network
    })
      .sort({ lastUpdatedOn: -1 })
      .limit(1)
    return status
  } catch (error) {
    return error
  }
}
