
import Sequelize from 'sequelize'
import { db } from '../database'
import { User } from './user'

export const UserRoleType = db.define('user_role_type', {

  id: {

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,

  },

  name: {

    type: Sequelize.STRING,
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

})