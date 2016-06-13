
import Sequelize from 'sequelize'
import { db } from '../database'

export const OAuthClient = db.define('oauth_client', {

  clientId: {

    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'client_id',
    primaryKey: true,

  },

  clientSecret: {
  
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    field: 'client_secret',
    primaryKey: true,    

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

})