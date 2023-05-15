import { Request, Response } from 'express'
//import accessController from '../controllers/accessController'
import express from 'express'
import cacheService from 'express-api-cache'
const cache = cacheService.cache
import {
  getNoOfErc721,
  getUniqueConsumers,
  getWeeklyUniquePublishMarkets,
  getMontlyUniquePublishMarkets,
  getFreeOrders,
  getPaidOrders,
  getOceanOrders,
  getUniqueConsumeMarkets,
  getYearlyUniquePublishMarkets,
  getUniquePublishMarketsNumber
} from '../controllers/core'

const router = express.Router()

function setDates({ since, to }: { since?: any; to?: any }) {
  let from: number, limit: number
  const now = Math.floor(Date.now() / 1000)
  if (!since) from = now - 15780000 // 6 months
  else from = parseInt(since as string)
  if (!to) limit = now
  else limit = parseInt(to as string)
  return { from, limit }
}

router.get(
  '/publishedNFT',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getNoOfErc721(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)
router.get(
  '/uniqueConsumers',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getUniqueConsumers(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/weeklyUniquePublishMarkets',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const weeklyPublishedMarkets = await getWeeklyUniquePublishMarkets(
        from,
        limit
      )
      res.status(200).json(weeklyPublishedMarkets)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/montlyUniquePublishMarkets',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    const { since, to } = req.query
    const { from, limit } = setDates({ since, to })
    const montlyPublishedMarkets = await getMontlyUniquePublishMarkets(
      from,
      limit
    )
    res.status(200).json(montlyPublishedMarkets)
  }
)

router.get(
  '/yearlyUniquePublishMarkets',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const yearlyPublishedMarkets = await getYearlyUniquePublishMarkets(
        from,
        limit
      )
      res.status(200).json(yearlyPublishedMarkets)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/totalUniquePublishMarkets',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const deposits = await getUniquePublishMarketsNumber()
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/uniqueConsumeMarkets',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getUniqueConsumeMarkets(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/freeConsumes',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getFreeOrders(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)
router.get(
  '/paidConsumes',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getPaidOrders(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

router.get(
  '/oceanConsumes',
  cache('10 minutes'),
  async function (req: Request, res: Response) {
    try {
      const { since, to } = req.query
      const { from, limit } = setDates({ since, to })
      const deposits = await getOceanOrders(from, limit)
      res.status(200).json(deposits)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
)

export default router
