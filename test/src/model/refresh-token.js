import { expect } from 'chai'

import { RefreshToken } from '../../../src/model/refresh-token'

import { v4 as uuid } from 'node-uuid'

describe(`RefreshToken`, () => {

  let refreshToken = null

  const attributes = {

    refreshToken: uuid(),
    refreshTokenExpiresOn: new Date(),
    clientId: uuid(),
    userId: uuid(),

  }

  beforeEach(() => RefreshToken
    .create(attributes)
    .then(_refreshToken => refreshToken = _refreshToken))

  afterEach(() => refreshToken
    .destroy()
    .then(() => refreshToken = null))

  it(`should create a refresh token instance`, () => {
    
    expect(refreshToken).to.exist

  })

})