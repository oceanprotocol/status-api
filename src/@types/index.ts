export enum State {
  Normal = 'Normal',
  Degraded = 'Degraded',
  Outage = 'Outage'
}
export interface IStatus {
  network: string
  currentBlock?: number
  components: IComponentStatus[]
  lastUpdatedOn: number
}

export interface IComponentStatus {
  name: string
  status: State
  response: number
  statusMessages?: string[]
  version?: string
  latestRelease?: string
  url?: string
  validChainList?: boolean
  block?: number
  validQuery?: boolean
  environments?: number
  limitReached?: boolean
  ethBalance?: string
  ethBalanceSufficient?: boolean
  oceanBalance?: string
  oceanBalanceSufficient?: boolean
}

export interface INetwork {
  name: string
  test: boolean
}
