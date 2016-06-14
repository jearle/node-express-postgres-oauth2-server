import { expect } from 'chai'

import { OAuthToken } from '../../../src/model/oauth-token'

import { v4 as uuid } from 'node-uuid'

const generateAttributes = ({ userId, } = {}) => ({

  accessToken: uuid(),
  accessTokenExpiresOn: new Date(),
  clientId: uuid(),
  userId: userId || uuid(),

})

const generateMultipleAttributes = (count, { userId, } = {}) => {

  return new Array(count)
    .fill(1)
    .map(() => generateAttributes({ userId, }))

}

describe(`OAuthToken`, () => {

  let oauthToken = null

  const attributes = generateAttributes()

  beforeEach(() => OAuthToken
    .create(attributes)
    .then(_oauthToken => oauthToken = _oauthToken))

  afterEach(() => oauthToken
    .destroy()
    .then(() => oauthToken = null))

  it(`should create an oauth token instance`, () => {

    expect(oauthToken).to.exist

  })

  describe(`destroyAllOtherUserTokens`, () => {

    it(`should destroy all other user tokens`, () => {

      const count = 10

      const otherAttributes = generateMultipleAttributes(count, {

        userId: attributes.userId,

      })

      return OAuthToken
        .bulkCreate(otherAttributes)
        .then(() => OAuthToken.findAll({

          where: {

            accessToken: otherAttributes
              .map(attributes => attributes.accessToken),

          },

        }))
        .then(tokens => {
          
          expect(tokens.length).to.equal(count)

        })
        .then(() => OAuthToken.destroyAllOtherUserTokens({

          userId: oauthToken.userId,
          tokenId: oauthToken.id,

        }))
        .then(() => OAuthToken.findAll({

          where: {

            accessToken: otherAttributes
              .map(attributes => attributes.accessToken),

          },

        }))
        .then(values => {

          expect(values.length).to.equal(0)

          return OAuthToken
            .find({

              where: {

                id: oauthToken.id,

              }
            })

        })
        .then(token => expect(token).to.exist)

    })

  })

})