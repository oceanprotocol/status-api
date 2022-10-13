import { Request, Response } from 'express'
import express from 'express'
import { insert, getStatus, getAll } from './db/mongodb'
import { IStatus } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  try {
    const response: IStatus[] = await getAll()
    res.send(response)
  } catch (error) {
    console.error(error)
  }
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  try {
    const response = await getStatus(req.params.network)
    res.send(response)
  } catch (error) {
    console.error(error)
  }
})

/* POST: update status of Ocean components in DB. */
router.post('/update', async function (req: Request, res: Response) {
  try {
    const response = await insert(req.body.status)
    res.send(response)
  } catch (error) {
    console.error(error)
  }
})

export default router
