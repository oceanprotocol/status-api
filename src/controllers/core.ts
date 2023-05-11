import {
  getSubgraphUrlFromChainId,
  getYearAndWeek,
  getWeeksOfYear,
  getMontsOfYear,
  getYearAndMonth,
  getYears,
  getYear
} from '../helpers/index'
import { networks } from '../config/index'
import fetch from 'cross-fetch'

// unique consumers per week
export async function getUniqueConsumersPerWeek(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) nfts[week] = {}
  do {
    const query = {
      query: `query{
                  orders(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to}} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    consumer {id}
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.orders.length < 1) {
      break
    }
    for (const row of respJSON.data.orders) {
      const key = getYearAndWeek(row.createdTimestamp)
      nfts[key][row.consumer.id] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

export async function getUniqueConsumers(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniqueConsumersPerWeek(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += Object.keys(allPromises[i][week]).length
      i++
    }
  }

  return results
}

// unique publishMarkers
async function getUniquePublishMarketsPerWeek(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) nfts[week] = {}
  do {
    const query = {
      query: `query{
                tokens(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} isDatatoken:true} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    publishMarketFeeAddress
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.tokens.length < 1) {
      break
    }
    for (const row of respJSON.data.tokens) {
      const key = getYearAndWeek(row.createdTimestamp)
      if (key) nfts[key][row.publishMarketFeeAddress] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

async function getUniquePublishMarketsPerMonth(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const months = getMontsOfYear(from, to)
  for (const month of months) nfts[month] = {}
  do {
    const query = {
      query: `query{
                tokens(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} isDatatoken:true} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    publishMarketFeeAddress
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.tokens.length < 1) {
      break
    }
    for (const row of respJSON.data.tokens) {
      const key = getYearAndMonth(row.createdTimestamp)
      if (key) nfts[key][row.publishMarketFeeAddress] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

async function getUniquePublishMarketsPerYear(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const years = getYears(from, to)
  for (const year of years) nfts[year] = {}
  do {
    const query = {
      query: `query{
                tokens(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} isDatatoken:true} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    publishMarketFeeAddress
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.tokens.length < 1) {
      break
    }
    for (const row of respJSON.data.tokens) {
      const key = getYear(row.createdTimestamp)
      if (key) nfts[key][row.publishMarketFeeAddress] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

async function getUniquePublishMarkets(chainId: number) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  do {
    const query = {
      query: `query{
                tokens(where:{isDatatoken:true} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    publishMarketFeeAddress
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.tokens.length < 1) {
      break
    }
    for (const row of respJSON.data.tokens) {
      if (!row.publishMarketFeeAddress)
        row.publishMarketFeeAddress =
          '0x0000000000000000000000000000000000000000'
      nfts[row.publishMarketFeeAddress] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}
export async function getWeeklyUniquePublishMarkets(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniquePublishMarketsPerWeek(network.chainId, from, to)
    i++
  }

  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += Object.keys(allPromises[i][week]).length
      i++
    }
  }
  return results
}

export async function getMontlyUniquePublishMarkets(from: number, to: number) {
  const prom = []
  const results = {}
  const months = getMontsOfYear(from, to)
  for (const month of months) results[month] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniquePublishMarketsPerMonth(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const month of months) {
    i = 0
    for (const network of networks) {
      results[month] += Object.keys(allPromises[i][month]).length
      i++
    }
  }
  return results
}

export async function getYearlyUniquePublishMarkets(from: number, to: number) {
  const prom = []
  const results = {}
  const years = getYears(from, to)
  for (const year of years) results[year] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniquePublishMarketsPerYear(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const year of years) {
    i = 0
    for (const network of networks) {
      results[year] += Object.keys(allPromises[i][year]).length
      i++
    }
  }
  return results
}

export async function getUniquePublishMarketsNumber() {
  const prom = []
  let results = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniquePublishMarkets(network.chainId)
    i++
  }
  const allPromises = await Promise.all(prom)
  i = 0
  for (const network of networks) {
    results += Object.keys(allPromises[i]).length
    i++
  }
  return results
}

// unique ConsumeMarkers
export async function getUniqueConsumeMarketsPerWeek(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) nfts[week] = {}
  do {
    const query = {
      query: `query{
                orders(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} } skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                    consumerMarket{id}
                  }
              }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.orders.length < 1) {
      break
    }
    for (const row of respJSON.data.orders) {
      const key = getYearAndWeek(row.createdTimestamp)
      if (row.consumerMarket && row.consumerMarket.id)
        nfts[key][row.consumerMarket.id] = true
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

export async function getUniqueConsumeMarkets(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getUniqueConsumeMarketsPerWeek(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += Object.keys(allPromises[i][week]).length
      i++
    }
  }

  return results
}

// nfts published
export async function getNoOfErc721PerChain(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const nfts = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) nfts[week] = 0
  do {
    const query = {
      query: `query{
                  nfts(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to}} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                  }
              }`
    }
    //console.log(query)
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.nfts.length < 1) {
      break
    }
    for (const row of respJSON.data.nfts) {
      const key = getYearAndWeek(row.createdTimestamp)
      nfts[key]++
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return nfts
}

export async function getNoOfErc721(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getNoOfErc721PerChain(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += allPromises[i][week]
      i++
    }
  }

  return results
}

// free orders
export async function getFreeOrdersPerChain(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const orders = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) orders[week] = 0
  do {
    const query = {
      query: `query{
                  orders(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} lastPriceValue:0} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                  }
              }`
    }
    //console.log(query)
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.orders.length < 1) {
      break
    }
    for (const row of respJSON.data.orders) {
      const key = getYearAndWeek(row.createdTimestamp)
      orders[key]++
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return orders
}

export async function getFreeOrders(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getFreeOrdersPerChain(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += allPromises[i][week]
      i++
    }
  }

  return results
}

export async function getPaidOrdersPerChain(
  chainId: number,
  from: number,
  to: number
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const orders = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) orders[week] = 0
  do {
    const query = {
      query: `query{
                  orders(where:{createdTimestamp_gte:${from} createdTimestamp_lt:${to} lastPriceValue_gt:0} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
                    createdTimestamp
                  }
              }`
    }
    //console.log(query)
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.orders.length < 1) {
      break
    }
    for (const row of respJSON.data.orders) {
      const key = getYearAndWeek(row.createdTimestamp)
      orders[key]++
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return orders
}

export async function getPaidOrders(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = 0
  let i = 0
  for (const network of networks) {
    prom[i] = getPaidOrdersPerChain(network.chainId, from, to)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week] += allPromises[i][week]
      i++
    }
  }

  return results
}

// free orders
export async function getOceanOrdersPerChain(
  chainId: number,
  from: number,
  to: number,
  oceanAddress: string
) {
  const subgraphUrl = getSubgraphUrlFromChainId(chainId)
  let skip = 0
  const orders = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) orders[week] = 0
  do {
    const query = {
      query: `query{
        orders(where: {createdTimestamp_gte:${from} createdTimestamp_lt:${to} lastPriceValue_not:0 lastPriceToken:"${oceanAddress}"} skip:${skip}, first:1000 orderBy:createdTimestamp orderDirection:asc){
          createdTimestamp
          lastPriceValue
          lastPriceToken {
            id
          }
        }
      }`
    }
    const response = await fetch(subgraphUrl, {
      method: 'POST',
      body: JSON.stringify(query)
    })
    const respJSON = await response.json()
    skip = skip + 1000
    if (!respJSON.data || respJSON.data.orders.length < 1) {
      break
    }
    for (const row of respJSON.data.orders) {
      const key = getYearAndWeek(row.createdTimestamp)
      orders[key] += parseFloat(row.lastPriceValue)
    }
    // eslint-disable-next-line no-constant-condition
  } while (true)
  return orders
}

export async function getOceanOrders(from: number, to: number) {
  const prom = []
  const results = {}
  const weeks = getWeeksOfYear(from, to)
  for (const week of weeks) results[week] = {}
  let i = 0
  for (const network of networks) {
    prom[i] = getOceanOrdersPerChain(network.chainId, from, to, network.Ocean)
    i++
  }
  const allPromises = await Promise.all(prom)
  for (const week of weeks) {
    i = 0
    for (const network of networks) {
      results[week][network.name] = parseFloat(allPromises[i][week])
      i++
    }
  }
  return results
}
