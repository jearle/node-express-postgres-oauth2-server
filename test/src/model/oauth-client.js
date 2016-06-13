
import { expect } from 'chai'

import { OAuthClient } from '../../../src/model/oauth-client'

describe(`OAuthClient`, () => {

  let oauthClient = null

  const attributes = {

    clientId: 'a-client-id',
    clientSecret: 'a-client-secret',

  }

  beforeEach(() => OAuthClient
    .create(attributes)
    .then(_oauthClient => oauthClient = _oauthClient))

  afterEach(() => oauthClient
    .destroy()
    .then(() => oauthClient = null))

  it(`should create an oauth client instance`, () => {

    expect(oauthClient).to.exist

  })

})