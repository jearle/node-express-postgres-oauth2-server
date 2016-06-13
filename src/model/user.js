
import Sequelize from 'sequelize'
import { hash, compare } from '../helper/hash'
import { db } from '../database'

const iterations = 4

export const User = db.define('user', {

  id: {

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,

  },

  username: {

    type: Sequelize.STRING,
    allowNull: false,
    unique: true,

  },

  password: {

    type: Sequelize.STRING,
    allowNull: false,

  },

  name: {

    type: Sequelize.STRING,

  },

  profileUrl: {

    type: Sequelize.STRING,
    field: 'profile_url',

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

const hashPasswordHook = (user, options) => {

  if (!user.changed('password')) return
  
  return hash(user.password, iterations)
    .then(hashedPassword => user.password = hashedPassword)

}

User.beforeCreate(hashPasswordHook)
User.beforeUpdate(hashPasswordHook)

User.findByCredentials = ({

  username,
  password,

}) => {

  let user = null

  return User
    .findOne({

      where: { username, },

    })
    .then(_user => {

      user = _user
      
      if (!user) return false

      return compare(password, user.password)

    })
    .then(isValidPassword => isValidPassword ? user : null)

}