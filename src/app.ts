import express from 'express'
import cors from 'cors'

import indexRouter from './routes'
import { connection } from './controllers/db'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/', indexRouter)

app.listen(port, async () => {
  await connection()
  console.log(`Status Service listening at http://localhost:${port}`)
})

export default app
