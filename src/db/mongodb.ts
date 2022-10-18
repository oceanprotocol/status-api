import { model, connect } from 'mongoose'
import { statusSchema } from './schema'
import { IStatus, INetwork } from '../@types'

const collection = process.env.COLLECTION ? process.env.COLLECTION : 'Test'
const Status = model<IStatus>(collection, statusSchema)

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

export async function getStatus(network: string): Promise<any> {
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

export async function getAll(): Promise<IStatus[]> {
  try {
    const networks: INetwork[] = JSON.parse(
      process.env.NETWORKS
        ? process.env.NETWORKS
        : '[{"name":"mainnet","test":false},{"name":"polygon","test":false},{"name":"bsc","test":false},{"name":"moonriver","test":false},{"name":"energyweb","test":false},{"name":"mumbai","test":true},{"name":"moonbase","test":true},{"name":"goerli","test":true}]'
    )
    const status: IStatus[] = []
    for (let i = 0; i < networks.length; i++) {
      const network: string = networks[i].name
      const data = await getStatus(network)
      status.push(data[0])
      if (status.length === networks.length) {
        return status
      }
    }
  } catch (error) {
    console.error(error)
    return error
  }
}
