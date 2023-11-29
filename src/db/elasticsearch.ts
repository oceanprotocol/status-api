import { Client } from '@elastic/elasticsearch'
import { INetwork, IStatus } from '../@types'
import 'dotenv/config'

export async function connection(): Promise<Client> {
  try {
    const client = new Client({
      node: process.env.DB_URL,
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    return client
  } catch (error) {
    console.log('es connection error:', error)
  }
}

export async function getStatus(network: string): Promise<IStatus> {
  try {
    const client = await connection()
    const result = await client.search({
      body: {
        from: 0,
        size: 1,
        query: {
          match: {
            network: network
          }
        },
        sort: {
          lastUpdatedOn: 'desc'
        }
      }
    })
    return result.hits.hits[0]._source as IStatus
  } catch (error) {
    return error
  }
}

export async function getAll(): Promise<IStatus[]> {
  try {
    const networks: INetwork[] = JSON.parse(
      process.env.NETWORKS
        ? process.env.NETWORKS
        : '[{"name":"general","test":false},{"name":"mainnet","test":false},{"name":"polygon","test":false},{"name":"optimism","test":false},{"name":"mumbai","test":true},{"name":"sepolia","test":true}]'
    )
    const status: IStatus[] = []
    for (let i = 0; i < networks.length; i++) {
      const result = await getStatus(networks[i].name)
      status.push(result)
    }

    return status
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function forwardQuery(body: any): Promise<any> {
  const client = await connection()
  return await client.search(body)
}
