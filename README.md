# Table of contents

- [Installation Instructions](#installing-instructions)
- [Running program](#running-program)

<a name="installing-instructions"/>

## Installation instructions

- Clone this repo using **HTTPS**: `https://github.com/CapstoneProjectKelompok3/NodeJS.git`

- Go to the directory project `cd NodeJS`

- Install dependencies **( recommended using NodeJS v.16 or more )** `npm install`

- Create `.env` file on directory root project

- Copy all contents from `.env example` to `.env`, you can place the environment value according to the configuration on your local computer

- generate prisma client first using command `npx prisma generate`

- migrate database into your db that you have created in `.env` using this command `npx prisma migrate dev`

<a name="running-program"/>

## Running program

- Run `npm run dev` to running application in development mode
- Run `npm run test` for testing mode