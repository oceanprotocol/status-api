import { Request, Response } from 'express'
import express from 'express'
import { networkStatus, getStatus, insert } from './db'
import { Status } from './@types'

const router = express.Router()

/* GET: current status of Ocean components on all networks. */
router.get('/', async function (req: Request, res: Response) {
  await getStatus((rows: Status[]) => {
    console.log('Get Status')
    res.send(rows)
  })
})

/* GET: current status of Ocean components on a given network. */
router.get('/network/:network', async function (req: Request, res: Response) {
  await networkStatus(req.params.network, (row: Status) => {
    console.log('NETWORK request')
    res.send(row)
  })
})

/* GET: current status of Ocean components on a given network. */
router.post('/update', async function (req: Request, res: Response) {
  await insert(req.body, () => {
    console.log('Database updated')
    res.send('Database updated')
  })
})

export default router
