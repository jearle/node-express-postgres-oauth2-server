
import Sequelize from 'sequelize'
import { db } from '../database'

export const OAuthToken = db.define('oauth_token', {

  id: {

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,

  },

  accessToken: {

    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'access_token',

  },

  accessTokenExpiresOn: {

    type: Sequelize.DATE,
    allowNull: false,
    field: 'access_token_expires_on',

  },

  clientId: {

    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'client_id',
    primaryKey: true,

  },

  userId: {

    type: Sequelize.UUID,
    allowNull: false,
    field: 'user_id',

  },

  createdAt: {

    type: Sequelize.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,

  },

  updatedAt: {

    type: Sequelize.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,

  },

}, {

  timestamps: false,
  
})

OAuthToken.destroyAllOtherUserTokens = ({

  userId,
  tokenId,

}) => {

  return OAuthToken
    .destroy({

      where: {

        userId,

        $not: {
          
          id: tokenId,

        },

      },

    })

}