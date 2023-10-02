import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import 'dotenv/config'
import apiRouter from './routers/api-router.js'

const app = express()
const limit = rateLimit({
   windowMs: (1000 * 60) * 60, // 1 hour,
   limit: 100,
   standardHeaders: 'draft-7',
   legacyHeaders: false,
   message: function (req, res) {
      res.status(429).json({
         status_code: 429,
         result: 'too many request',
         message: `max request per IP is ${this.limit} request per 1 hour(s)`
      })
   }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(limit, apiRouter)

app.listen(process.env.SERVER_PORT, () => {
   console.log(`server started on port ${process.env.SERVER_PORT}`)
})