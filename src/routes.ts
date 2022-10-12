import { Request, Response } from 'express'
import express from 'express'
import { networkStatus, getStatus } from './db'
import { insert } from './db/mongodb'
import { Status } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  await getStatus((data: Status[]) => {
    res.send(data)
  })
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  await networkStatus(req.params.network, (row: Status) => {
    res.send(row)
  })
})

/* POST: update status of Ocean components in DB. */
router.post('/update', async function (req: Request, res: Response) {
  const response = await insert(req.body.status)
  res.send(response)
  // await insert(req.body.status, (response: string) => {
  //   console.log('response', response)
  //   res.send(response)
  // })
})

export default router
