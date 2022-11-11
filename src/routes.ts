import { Request, Response } from 'express'
import express from 'express'
import { IStatus } from './@types'
import { forwardQuery, getAll, getStatus } from './db/elasticsearch'

const router = express.Router()

/* POST: forwards query to es. */
router.post('/search', async function (req: Request, res: Response) {
  try {
    const response = await forwardQuery(req.body)
    res.send(response)
  } catch (error) {
    console.error(error)
  }
})
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

export default router
