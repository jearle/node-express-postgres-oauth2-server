
import { OAuthClient } from '../../src/model/oauth-client'

import { db } from '../../src/database'

OAuthClient
  .create({

    clientId: '08215ea7-e7d3-4eca-a80d-f1080e7fc680',
    clientSecret: '2a5a5962-20e0-43d0-8f3d-acc0b3644046',

  })
  .then(() => console.log('oauth client created'))
  .then(() => db.close())