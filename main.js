import express from 'express'
import 'dotenv/config'
import apiRouter from './routers/api-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRouter)


const SERVER_PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";

app.listen(SERVER_PORT, HOST, () => {
   console.log(`server started on ${HOST}:${SERVER_PORT}`)
})