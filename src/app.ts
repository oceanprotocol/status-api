import express from 'express'
import cors from 'cors'

import statusRouter from './routes/statusRoutes'
import coreStatsRouter from './routes/coreStatsRoutes'
import veOceeanStatsRouter from './routes/veOceanStatsRoutes'

const app = express()
const port = process.env.PORT ? process.env.PORT : 8000

app.use(express.json())
app.use(cors())
app.use('/', statusRouter)
app.use('/stats/core', coreStatsRouter)
app.use('/stats/veOcean', veOceeanStatsRouter)

app.listen(port, async () => {
  console.log(`Status Service listening at http://localhost:${port}`)
})

export default app
