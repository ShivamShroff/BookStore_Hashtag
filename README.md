# Book_store-Taghash-
================
# Getting Started


## Client
### Navigate to Client Directory cd client
### Install Dependency npm install
### run the client - npm run dev

## Server
### Navigate to Server Directory cd server
### Install Dependency npm install
### Set up Environment Variables by creating .env files in server directory
### for ref check examples.env
### run prisma migrations: npx prisma migrate dev
### start the server - npm run dev

#### test for Server
### Navigate to Server Directory cd server
### start testing - npm test

## prisma
### navigate to server directory cd server
### npx prisma studio
### visualize live db table

## to make change in db schema
### modify prisma file
### generate migration - new prisma migrate dev --migration name
### migrate to db - npx prisma migrate deploy
### generate prisma client - npx prisma generate
Check out this video: [Project Overview](https://youtu.be/xTnH2mn1tb0?si=zteZ6FBeJMkZLg3j)
