import { Request, Response } from 'express'
import express from 'express'
import { insert, getStatus } from './db/mongodb'
import { IStatus } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  // await getStatus((data: IStatus[]) => {
  //   res.send(data)
  // })
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  const response = await getStatus(req.params.network)
  console.log('Get network status response:', response)
  res.send(response)
})

/* POST: update status of Ocean components in DB. */
router.post('/update', async function (req: Request, res: Response) {
  const response = await insert(req.body.status)
  console.log('Update request response:', response)
  res.send(response)
})

export default router
