
import { User } from './src/model/user'
import { OAuthClient } from './src/model/oauth-client'
import { OAuthToken } from './src/model/oauth-token'
import { RefreshToken } from './src/model/Refresh-token'

const express     = require('express')       // routing library
const oauthServer = require('oauth2-server') // used for oauth2.0
const bodyParser  = require('body-parser')   // parses the body of the request to json
const morgan      = require('morgan')        // used for logging

const app = express()

// app.use adds middlewear to every call
//
// order matters


// logs look like:
//
//  GET / 200 5.591 ms - 11
//
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//simple logger
const log = message => {

  console.log('')
  console.log('================================')
  console.log(message)
  console.log('================================')
  console.log('')

}


// take a look at what each done.toString()
// call looks like to see how each function
// handles its passed in values
const oauth = oauthServer({

  model: {

    getAccessToken: (accessToken, done) => {
      
      log('get access token')

      OAuthToken
        .findOne({

          where: {

            accessToken,

          },

        })
        .then(token => {

          token.expires = token.accessTokenExpiresOn
        
          if (!token)
            done(new Error('Failed to retreive your access token'))
            
          return done(null, token)

        })

    },
    
    getClient: function (clientId, clientSecret, done) {

      log('get client called')

      OAuthClient
        .findOne({

          where: {

            clientId,
            clientSecret,

          },

        })
        .then(oauthClient => {

          if (!oauthClient) {

            return done(new Error('client id or secret incorrect'))

          }

          done(null, { grants: ['password', 'refresh_token'] })

        })

    },

    grantTypeAllowed: function (clientId, grantType, done) {

      log('grant type allowed called')

      if (clientId === '08215ea7-e7d3-4eca-a80d-f1080e7fc680' &&
          (grantType === 'password' ||
           grantType === 'refresh_token'))

        done(null, true)

      else

        done(`Grant type ${ grantType } not allowed for ${ clientId }`)

    },
    
    saveAccessToken: function (accessToken, clientId, accessTokenExpiresOn, user, done) {
      
      log('save access token called')

      const userId = user.id

      console.log(accessTokenExpiresOn)

      OAuthToken
        .create({
          accessToken,
          clientId,
          accessTokenExpiresOn,
          userId,
        })
        .then(token => {

          if (!token)
            return done(new Error('failed to save token'))

          done(null)

        })

    },

    saveRefreshToken: function (refreshToken, clientId, refreshTokenExpiresOn, user, done) {
      
      log('save refresh token called')

      console.log(refreshToken)
      console.log(clientId)
      console.log(refreshTokenExpiresOn)
      console.log(user.id)

      const userId = user.id

      RefreshToken
        .create({

          refreshToken,
          refreshTokenExpiresOn,
          userId,
          clientId

        })
        .then(refreshToken => {

          if (!refreshToken)
            return done(new Error('Refresh token failed to save'))

          done(null, refreshToken)

        })

    },

    getRefreshToken: function (refreshToken, done) {

      console.log(done.toString())

      RefreshToken
        .findOne({

          where: {

            refreshToken,

          },

        })
        .then(refreshToken => {

          if (!refreshToken)
            return done(new Error('failed to retreive refresh token'))

          refreshToken.expires = refreshToken.refreshTokenExpiresOn

          done(null, refreshToken)
          
        })

    },
    
    getUser: (username, password, done) => {
      
      log('get user called')

      return User
        .findByCredentials({

          username,
          password,

        })
        .then(user => done(null, user))

    },

  },

  grants: ['password', 'refresh_token'],

  debug: true,
  
  accessTokenLifetime: 5,

})

app.all('/oauth/token', oauth.grant())
 
app.get('/', oauth.authorise(), (req, res) => {

  log('authenticated root route called')

  // console.log(req.oauth.bearerToken)
  res.send('Secret area')

})
 
app.use(oauth.errorHandler())

app.listen(3000)