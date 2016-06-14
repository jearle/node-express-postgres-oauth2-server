
import { OAuthClient } from '../model/oauth-client'

export const getClient = (clientId, clientSecret, done) => {

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

}