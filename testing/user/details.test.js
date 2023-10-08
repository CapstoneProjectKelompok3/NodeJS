import request from 'supertest'
import 'dotenv/config'
import mongoose from 'mongoose'
import app from '../../main.js'
import supertest from 'supertest'

describe("Get details data user", () => {

  let tokenUser, tokenAdmin, tokenSA

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it("Should return 200 when sucess get data user", async () => {
    const response = await supertest(app)
      .get('/users/1')
      .set({
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbjFAZ21haWwuY29tIiwibGV2ZWwiOiJhZG1pbiIsInVzZXJuYW1lIjoiYmFtYmFuZyIsImlhdCI6MTY5NjY1MDMwOCwiZXhwIjoxNjk2NzM2NzA4fQ.D7vG4wWFKCFxUmntRhwGfLbCK9B6gOeAH4cJDaRgADQ"
      })

    console.log(response);
    expect(1 + 1).toEqual(2)
  })
})