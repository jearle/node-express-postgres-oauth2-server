
import { RefreshToken } from '../model/Refresh-token'

export const getRefreshToken = (refreshToken, done) => {

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

}