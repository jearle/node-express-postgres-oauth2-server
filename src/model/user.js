
import Sequelize from 'sequelize'
import { hash, compare } from '../helper/hash'
import { db } from '../database'

const iterations = 4

const UserRole = db.define('user_role', {

  id: {

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,

  },

  userId: {

    type: Sequelize.STRING,
    allowNull: false,
    field: 'user_id',

  },

  roleId: {

    type: Sequelize.STRING,
    allowNull: false,
    field: 'role_id',

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

export const Role = db.define('role', {

  id: {

    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true,

  },

  name: {

    type: Sequelize.STRING,
    allowNull: false,
    unique: true,

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

Role.belongsToMany(User, { through: UserRole })
User.belongsToMany(Role, { through: UserRole })

const hashPasswordHook = (user, options) => {

  if (!user.changed('password')) return
  
  return hash(user.password, iterations)
    .then(hashedPassword => user.password = hashedPassword)

}

User.beforeCreate(hashPasswordHook)
User.beforeUpdate(hashPasswordHook)

User.addRole = ({

  user,
  userId,
  roleName: name,

}) => {

  return Role
    .findOrCreate({

      where: { name, }

    })
    .then(roles => roles[0])
    .then(role => {
      
      if (user) {

        return {

          user,
          role,

        }

      }

      else {

        return User
          .findById(userId)
          .then(user => {
            
            return {

              user,
              role,

            }

          })

      }

    })
    .then(({ user, role }) => {

      return user
        .addRole(role)
        .then(() => ({ user, role }))

    })

}

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