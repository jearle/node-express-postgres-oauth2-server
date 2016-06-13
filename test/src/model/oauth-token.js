import { expect } from 'chai'

import { OAuthToken } from '../../../src/model/oauth-token'

import { v4 as uuid } from 'node-uuid'

describe(`OAuthToken`, () => {

  let oauthToken = null

  const attributes = {

    accessToken: uuid(),
    accessTokenExpiresOn: new Date(),
    clientId: uuid(),
    userId: uuid(),

  }

  beforeEach(() => OAuthToken
    .create(attributes)
    .then(_oauthToken => oauthToken = _oauthToken))

  afterEach(() => oauthToken
    .destroy()
    .then(() => oauthToken = null))

  it(`should create an oauth token instance`, () => {

    expect(oauthToken).to.exist

  })

})