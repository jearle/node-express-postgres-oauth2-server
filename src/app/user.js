
import express from 'express'
import { oauthServer } from '../oauth/server'

export const userApp = express()

userApp
  .get('/', oauthServer.authorise(), (req, res) => {

    console.log(req.oauth.bearerToken)
    res.send('Secret area')

  })