
import { urlencoded, json } from 'body-parser'
import express from 'express'
import morgan from 'morgan'

import { model } from './oauth/model'
import { oauthServer } from './oauth/server'
import { userApp } from './app/user'

export const app = express()

app
  .use(morgan('dev'))
  .use(urlencoded({ extended: true }))
  .use(json())
  .use(oauthServer.errorHandler())
  .all('/oauth/token', oauthServer.grant())
  .use('/', userApp)

// app
  