
import _oauthServer from 'oauth2-server'

import { model } from './model'

export const oauthServer = _oauthServer({

  model,

  grants: ['password', 'refresh_token'],

  debug: true,

})