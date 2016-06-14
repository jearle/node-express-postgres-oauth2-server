
import { OAuthToken } from '../model/oauth-token'

export const getAccessToken = (accessToken, done) => {

  OAuthToken
    .findOne({

      where: {

        accessToken,

      },

    })
    .then(token => {

      if (!token)
        done(new Error('Failed to retreive your access token'))

      token.expires = token.accessTokenExpiresOn
        
      return done(null, token)

    })

}