import request from 'supertest'
import { assert } from 'chai'
import app from '../src/app'
import { IStatus, FaucetStatus, State, INetwork } from '../src/@types'
import { BigNumber } from 'bignumber.js'

describe('API Request Tests', function () {
  this.timeout(300000)
  const recentBlock = Math.floor(Math.random() * 1000000)
  const date = Date.now()
  const faucetBalance = '100000000'
  console.log('recentBlock', recentBlock)

  const exampleStatus = (
    network: string,
    faucet: FaucetStatus | Record<string, never>
  ): IStatus => {
    const status: IStatus = {
      network: network,
      currentBlock: recentBlock,
      market: State.Up,
      port: State.Up,
      dataFarming: State.Up,
      daoGrants: State.Up,
      faucet,
      provider: {
        response: 200,
        version: '1.0.20',
        latestRelease: '1.3.4',
        status: State.Up
      },
      subgraph: {
        block: recentBlock,
        version: '2.1.3',
        latestRelease: '2.1.3',
        response: 200,
        status: State.Up
      },
      aquarius: {
        response: 200,
        version: '4.4.2',
        latestRelease: '4.5.1',
        validChainList: true,
        block: recentBlock,
        monitorVersion: '4.5.1',
        validQuery: true,
        status: State.Up
      },
      operator: {
        limitReached: false,
        response: 200,
        version: '1.0.1',
        latestRelease: '1.0.1',
        environments: 2,
        status: State.Up
      },
      lastUpdatedOn: date
    }
    return status
  }

  const faucetStatus: FaucetStatus = {
    status: State.Up,
    response: 200,
    ethBalance: new BigNumber(faucetBalance),
    ethBalanceSufficient: true,
    oceanBalance: new BigNumber(faucetBalance),
    oceanBalanceSufficient: true
  }

  it('Updates the status in the DB from mainnet', async () => {
    const status = exampleStatus('mainnet', {})
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form polygon', async () => {
    const status = exampleStatus('polygon', {})
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form BSC', async () => {
    const status = exampleStatus('bsc', {})
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form moonriver', async () => {
    const status = exampleStatus('moonriver', {})
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form energyweb', async () => {
    const status = exampleStatus('energyweb', {})
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form goerli', async () => {
    const status = exampleStatus('goerli', faucetStatus)
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form mumbai', async () => {
    const status = exampleStatus('mumbai', faucetStatus)
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  it('Updates the status in the DB form moonbase', async () => {
    const status = exampleStatus('moonbase', faucetStatus)
    const response = await request(app)
      .post('/update')
      .send({ status })
      .expect(200)

    assert(response.text === 'New status inserted in MongoDB', 'Update failed')
  })

  // it('Gets the current status of Ocean services for all networks', async () => {
  //   const response = await request(app)
  //     .get(`/`)
  //     .expect('Content-Type', /json/)
  //     .expect(200)

  //   const data: Status[] = response.body

  //   assert(data.length === 8, `Invalid number of networks returned`)
  // })

  const networkList: INetwork[] = JSON.parse(
    process.env.NETWORKS
      ? process.env.NETWORKS
      : '[{"name":"mainnet","test":false},{"name":"polygon","test":false},{"name":"bsc","test":false},{"name":"moonriver","test":false},{"name":"energyweb","test":false},{"name":"mumbai","test":true},{"name":"moonbase","test":true},{"name":"goerli","test":true}]'
  )

  networkList.forEach((element: INetwork) => {
    const network = element.name
    const test = element.test
    it(`Gets the current status of Ocean services on ${network}`, async () => {
      const response = await request(app)
        .get(`/network/${network}`)
        .expect('Content-Type', /json/)
        .expect(200)
      console.log('response.body', response.body)
      const data: IStatus = response.body[0]

      assert(data.network === `${network}`, `Invalid network for ${network}`)
      assert(
        data.currentBlock === recentBlock,
        `Invalid currentBlock for ${network}`
      )
      assert(
        data.aquarius.status === `UP` || `WARNING`,
        `Invalid aquariusStatus for ${network}`
      )
      assert(
        data.aquarius.response === 200,
        `Invalid aquariusResponse for ${network}`
      )
      assert(
        data.aquarius.validChainList === true,
        `Invalid aquariusChain for ${network}`
      )
      assert(data.aquarius.version, `Invalid aquariusVersion for ${network}`)
      assert(
        data.aquarius.latestRelease,
        `Invalid aquariusLatestRelease for ${network}`
      )

      assert(
        data.aquarius.block === recentBlock,
        `Invalid aquariusBlock for ${network}`
      )
      assert(
        data.aquarius.validQuery === true,
        `Invalid aquariusValidQuery for ${network}`
      )
      assert(
        data.provider.status === `UP` || `WARNING`,
        `Invalid body for ${network}`
      )
      assert(
        data.provider.response === 200,
        `Invalid providerResponse for ${network}`
      )
      assert(data.provider.version, `Invalid providerVersion for ${network}`)
      assert(
        data.provider.latestRelease,
        `Invalid providerLatestRelease for ${network}`
      )
      assert(
        data.subgraph.status === `UP` || `WARNING`,
        `Invalid subgraphStatus for ${network}`
      )
      assert(
        data.subgraph.response === 200,
        `Invalid subgraphResponse for ${network}`
      )
      assert(data.subgraph.version, `Invalid subgraphVersion for ${network}`)
      assert(
        data.subgraph.latestRelease,
        `Invalid subgraphLatestRelease for ${network}`
      )
      assert(
        data.subgraph.block === recentBlock,
        `Invalid subgraphBlock for ${network}`
      )
      assert(data.operator.status === `UP`, `Invalid operatorStatus ${network}`)
      assert(
        data.operator.response === 200,
        `Invalid operatorResponse for ${network}`
      )
      assert(data.operator.version, `Invalid operatorVersion for ${network}`)
      assert(
        data.operator.latestRelease,
        `Invalid operatorLatestRelease for ${network}`
      )
      assert(
        data.operator.environments === Number(`2`),
        `Invalid operatorEnvironments for ${network}`
      )
      assert(
        data.operator.limitReached === false,
        `Invalid operatorLimitReached for ${network}`
      )
      assert(data.market === `UP`, `Invalid market for ${network}`)
      assert(data.port === `UP`, `Invalid port for ${network}`)
      if (test) {
        assert(
          (data.faucet.status = State.Up),
          `Invalid faucet status for ${network}`
        )
        assert(
          data.faucet.response === 200,
          `Invalid faucet response for ${network}`
        )
        assert(
          data.faucet.ethBalance === faucetBalance,
          `Invalid faucet ethBalance for ${network}`
        )
        assert(
          data.faucet.ethBalanceSufficient === true,
          `Invalid faucet ethBalanceSufficient for ${network}`
        )
        assert(
          data.faucet.oceanBalance === faucetBalance,
          `Invalid faucet oceanBalance for ${network}`
        )
        assert(
          data.faucet.oceanBalanceSufficient === true,
          `Invalid faucet oceanBalanceSufficient for ${network}`
        )
      }

      assert(
        data.lastUpdatedOn === date,
        `Invalid lastUpdatedOn for ${network}`
      )
    })
  })
})
