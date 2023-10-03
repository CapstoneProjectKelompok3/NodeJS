import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const authenticationRegister = async (request) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(request.password, salt);
  
    const payload = {
      email: request.email,
      username: request.username,
      password: hashPassword
    }
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '30m'
    })
  
    let auth;
    // create record to table authentications
    try {
      auth = await prisma.authentication.create({
        data: {
          token: token
        }
      })
    } catch (err) {
      throw err;
    }
  
    return auth;
  };