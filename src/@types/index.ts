import { BigNumber } from 'bignumber.js'

export enum State {
  Up = 'UP',
  Down = 'DOWN',
  Warning = 'WARNING'
}
export interface IStatus {
  network: string
  currentBlock: number
  market: State
  dataFarming: State
  faucet: IFaucetStatus | Record<string, never>
  aquarius: IAquariusStatus
  provider: IProviderStatus
  subgraph: ISubgraphStatus
  operator: IOperatorStatus

  lastUpdatedOn: number
}
export interface IProviderStatus {
  status?: State
  statusMessages?: string
  response?: number
  version?: string
  latestRelease?: string
}

export interface IAquariusStatus {
  status?: State
  statusMessages?: string
  response?: number
  validChainList?: boolean
  version?: string
  monitorVersion?: string
  latestRelease?: string
  block?: number
  validQuery?: boolean
}
export interface ISubgraphStatus {
  status?: State
  statusMessages?: string
  response?: number
  version?: string
  latestRelease?: string
  block?: number
}

export interface IOperatorStatus {
  status?: State
  statusMessages?: string
  response?: number
  version?: string
  latestRelease?: string
  environments?: number
  limitReached?: boolean
}
export interface IFaucetStatus {
  status?: State
  statusMessages?: string
  response?: number
  ethBalance?: BigNumber | string
  ethBalanceSufficient?: boolean
  oceanBalance?: BigNumber | string
  oceanBalanceSufficient?: boolean
}

export interface INetwork {
  name: string
  test: boolean
}
