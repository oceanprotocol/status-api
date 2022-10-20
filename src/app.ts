import express from 'express'
import cors from 'cors'

import indexRouter from './routes'

const app = express()
const port = process.env.PORT ? process.env.PORT : 8000

app.use(express.json())
app.use(cors())
app.use('/', indexRouter)

app.listen(port, async () => {
  console.log(`Status Service listening at http://localhost:${port}`)
})

export default app
