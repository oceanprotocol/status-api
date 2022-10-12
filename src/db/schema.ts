import { Schema } from 'mongoose'
import { Status, State } from '../@types'
import { BigNumber } from 'ethers'

export const statusSchema = new Schema<Status>({
  network: { type: String, required: true },
  currentBlock: { type: Number, required: true },
  market: { type: String, enum: State, required: true, default: State.Warning },
  port: { type: String, enum: State, required: true, default: State.Warning },
  faucet: {
    status: { type: String, enum: State, required: true },
    response: Number,
    // ethBalance: BigNumber,
    ethBalanceSufficient: Boolean,
    // oceanBalance: BigNumber,
    oceanBalanceSufficient: Boolean
  },
  aquarius: {
    status: { type: String, enum: State, required: true },
    response: Number,
    validChainList: Boolean,
    version: String,
    monitorVersion: String,
    latestRelease: String,
    block: Number,
    validQuery: Boolean
  },
  provider: {
    status: { type: String, enum: State, required: true },
    response: Number,
    version: String,
    latestRelease: String
  },
  subgraph: {
    status: { type: String, enum: State, required: true },
    response: Number,
    version: String,
    latestRelease: String,
    block: Number
  },
  operator: {
    status: { type: String, enum: State, required: true },
    response: Number,
    version: String,
    latestRelease: String,
    environments: Number,
    limitReached: Boolean
  },
  dataFarming: { type: String, enum: State, required: true },
  daoGrants: { type: String, enum: State, required: true },
  lastUpdatedOn: { type: Number, required: true, default: Date.now }
})
