
import { OAuthToken } from '../model/oauth-token'

export const saveAccessToken = (accessToken, clientId, accessTokenExpiresOn, user, done) => {
      
  const userId = user.id

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

      OAuthToken
        .destroyAllOtherUserTokens({

          userId,
          tokenId: token.id,

        })

    })

}