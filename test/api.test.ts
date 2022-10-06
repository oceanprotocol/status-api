import request from 'supertest'
import { assert } from 'chai'
import app from '../src/app'
import { Status } from '../src/@types'

describe('Price Request Tests', function () {
  this.timeout(300000)
  const recentBlock = 10000000

  //   const exampleStatus = {
  //     "network": "mainnet",
  //     "currentBlock": 15688395,
  //     "market": "UP",
  //     "port": "UP",
  //     "dataFarming": "UP",
  //     "daoGrants": "UP",
  //     "faucet": {},
  //     "provider": {
  //         "response": 200,
  //         "version": "1.0.20",
  //         "latestRelease": "1.3.4",
  //         "status": "WARNING"
  //     },
  //     "subgraph": {
  //         "block": 15688395,
  //         "version": "2.1.3",
  //         "latestRelease": "2.1.3",
  //         "response": 200,
  //         "status": "UP"
  //     },
  //     "aquarius": {
  //         "response": 200,
  //         "version": "4.4.2",
  //         "latestRelease": "4.5.1",
  //         "validChainList": true,
  //         "block": 15688390,
  //         "monitorVersion": "4.5.1",
  //         "validQuery": true,
  //         "status": "WARNING"
  //     },
  //     "operator": {
  //         "limitReached": false,
  //         "response": 200,
  //         "version": "1.0.1",
  //         "latestRelease": "1.0.1",
  //         "environments": 2,
  //         "status": "UP"
  //     },
  //     "lastUpdatedOn": 1665051262570
  // }

  it('Gets the current status of Ocean services on Mainnet', async () => {
    const response = await request(app)
      .get('/network/mainnet')
      .expect('Content-Type', /json/)
      .expect(200)
    const data: Status = response.body

    console.log('Mainnet row', data)

    assert(data, 'Invalid body for mainnet')
    assert(data.network === 'mainnet', 'Invalid network for mainnet')
    assert(
      data.aquarius.status === 'UP' || 'WARNING',
      'Invalid aquariusStatus for mainnet'
    )
    assert(
      data.aquarius.response === 200,
      'Invalid aquariusResponse for mainnet'
    )
    assert(
      data.aquarius.validChainList === true,
      'Invalid aquariusChain for mainnet'
    )
    assert(data.aquarius.version, 'Invalid aquariusVersion for mainnet')
    assert(
      data.aquarius.latestRelease,
      'Invalid aquariusLatestRelease for mainnet'
    )
    assert(
      data.aquarius.block > recentBlock,
      'Invalid aquariusBlock for mainnet'
    )
    assert(
      data.aquarius.validQuery === true,
      'Invalid aquariusValidQuery for mainnet'
    )
    assert(
      data.provider.status === 'UP' || 'WARNING',
      'Invalid body for mainnet'
    )
    assert(
      data.provider.response === 200,
      'Invalid providerResponse for mainnet'
    )
    assert(data.provider.version, 'Invalid providerVersion for mainnet')
    assert(
      data.provider.latestRelease,
      'Invalid providerLatestRelease for mainnet'
    )
    assert(
      data.subgraph.status === 'UP' || 'WARNING',
      'Invalid subgraphStatus for mainnet'
    )
    assert(
      data.subgraph.response === 200,
      'Invalid subgraphResponse for mainnet'
    )
    assert(data.subgraph.version, 'Invalid subgraphVersion for mainnet')
    assert(
      data.subgraph.latestRelease,
      'Invalid subgraphLatestRelease for mainnet'
    )
    assert(
      data.subgraph.block > recentBlock,
      'Invalid subgraphBlock for mainnet'
    )
    assert(data.operator.status === 'UP', 'Invalid operatorStatus for mainnet')
    assert(
      data.operator.response === 200,
      'Invalid operatorResponse for mainnet'
    )
    assert(data.operator.version, 'Invalid operatorVersion for mainnet')
    assert(
      data.operator.latestRelease,
      'Invalid operatorLatestRelease for mainnet'
    )
    assert(
      data.operator.environments === Number(process.env.C2D_ENVIRONMENTS),
      'Invalid operatorEnvironments for mainnet'
    )
    assert(
      data.operator.limitReached === false,
      'Invalid operatorLimitReached for mainnet'
    )
    assert(data.market === 'UP', 'Invalid market for mainnet')
    assert(data.port === 'UP', 'Invalid port for mainnet')
    assert(data.faucet, 'Invalid faucet for mainnet')
    assert(Object.keys(data.faucet).length === 0, 'Invalid faucet for mainnet')
    assert(
      data.lastUpdatedOn > Date.now() - 500000000,
      'Invalid lastUpdatedOn for mainnet'
    )
  })

  it('Gets the current status of Ocean services on Polygon', async () => {
    const response = await request(app)
      .get('/network/polygon')
      .expect('Content-Type', /json/)
      .expect(200)

    const data: Status = response.body

    console.log('Mainnet data', data)

    assert(data, 'Invalid body for Polygon')
    assert(data.network === 'polygon', 'Invalid network for Polygon')
    assert(
      data.aquarius.status === 'UP' || 'WARNING',
      'Invalid aquariusStatus for Polygon'
    )
    assert(
      data.aquarius.response === 200,
      'Invalid aquariusResponse for mainnet'
    )
    assert(
      data.aquarius.validChainList === true,
      'Invalid aquariusChain for Polygon'
    )
    assert(data.aquarius.version, 'Invalid aquariusVersion for Polygon')
    assert(
      data.aquarius.latestRelease,
      'Invalid aquariusLatestRelease for Polygon'
    )
    assert(
      data.aquarius.block > recentBlock,
      'Invalid aquariusBlock for Polygon'
    )
    assert(
      data.aquarius.validQuery === true,
      'Invalid aquariusValidQuery for Polygon'
    )
    assert(
      data.provider.status === 'UP' || 'WARNING',
      'Invalid body for Polygon'
    )
    assert(
      data.provider.response === 200,
      'Invalid providerResponse for Polygon'
    )
    assert(data.provider.version, 'Invalid providerVersion for Polygon')
    assert(
      data.provider.latestRelease,
      'Invalid providerLatestRelease for Polygon'
    )
    assert(
      data.subgraph.status === 'UP' || 'WARNING',
      'Invalid subgraphStatus for Polygon'
    )
    assert(
      data.subgraph.response === 200,
      'Invalid subgraphResponse for Polygon'
    )
    assert(data.subgraph.version, 'Invalid subgraphVersion for Polygon')
    assert(
      data.subgraph.latestRelease,
      'Invalid subgraphLatestRelease for Polygon'
    )
    assert(
      data.subgraph.block > recentBlock,
      'Invalid subgraphBlock for Polygon'
    )
    assert(data.operator.status === 'UP', 'Invalid operatorStatus for Polygon')
    assert(
      data.operator.response === 200,
      'Invalid operatorResponse for Polygon'
    )
    assert(data.operator.version, 'Invalid operatorVersion for Polygon')
    assert(
      data.operator.latestRelease,
      'Invalid operatorLatestRelease for Polygon'
    )
    assert(
      data.operator.environments === Number(process.env.C2D_ENVIRONMENTS),
      'Invalid operatorEnvironments for Polygon'
    )
    assert(
      data.operator.limitReached === false,
      'Invalid operatorLimitReached for Polygon'
    )
    assert(data.market === 'UP', 'Invalid market for Polygon')
    assert(data.port === 'UP', 'Invalid port for Polygon')
    assert(data.faucet, 'Invalid faucet for mainnet')
    assert(Object.keys(data.faucet).length === 0, 'Invalid faucet for mainnet')
    assert(
      data.lastUpdatedOn > Date.now() - 500000000,
      'Invalid lastUpdatedOn for Polygon'
    )
  })
})
