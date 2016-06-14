
import { RefreshToken } from '../model/Refresh-token'

export const saveRefreshToken = (refreshToken, clientId, refreshTokenExpiresOn, user, done) => {
      
  const userId = user.id

  RefreshToken
    .create({

      refreshToken,
      refreshTokenExpiresOn,
      userId,
      clientId,

    })
    .then(refreshToken => {

      if (!refreshToken)
        return done(new Error('Refresh token failed to save'))

      done(null, refreshToken)

    })

}