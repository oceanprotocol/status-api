import { Request, Response } from 'express'
import express from 'express'
import { networkStatus, getStatus } from './db'
import { insert } from './db/mongodb'
import { IStatus } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  await getStatus((data: IStatus[]) => {
    res.send(data)
  })
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  await networkStatus(req.params.network, (row: IStatus) => {
    res.send(row)
  })
})

/* POST: update status of Ocean components in DB. */
router.post('/update', async function (req: Request, res: Response) {
  const response = await insert(req.body.status)
  console.log('Update request response:', response)
  res.send(response)
})

export default router
