import { Request, Response } from 'express'
import express from 'express'
import { networkStatus, getStatus } from './db'
import { Status } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  await getStatus((rows: Status[]) => {
    res.send(rows)
  })
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  await networkStatus(req.params.network, (row: Status) => {
    res.send(row)
  })
})

export default router
