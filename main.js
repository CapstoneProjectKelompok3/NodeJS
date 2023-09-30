import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import apiRouter from './routers/api-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(apiRouter)

app.listen(process.env.SERVER_PORT, () => {
   console.log(`server started on port ${process.env.SERVER_PORT}`)
})