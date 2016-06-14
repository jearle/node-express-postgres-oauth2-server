
import { expect } from 'chai'

import { User, Role } from '../../../src/model/user'
import { db } from '../../../src/database'

describe(`User`, () => {

  let user = null

  const userAttributes = {

    username: 'test.usfer@gmodfsney.sike',
    password: 'a-password-yo',
    name: 'Test User Joe',
    profileUrl: 'http://google.com/an-image.jpg',

  }

  beforeEach(() => User
    .create(userAttributes)
    .then(_user => user = _user))

  afterEach(() => user
    .destroy()
    .then(() => user = null))

  describe(`addRole`, () => {

    const testAddRole = ({ userId, user }) => {

      return User
        .addRole({

          user,
          userId,
          roleName: 'admin',

        })
        .then(({ user, role }) => {
          
          return user.getRoles()
            .then(roles => ({ user, roles }))

        })
        .then(({ user, roles }) => {

          expect(roles[0].name).to.equal('admin')

          return {

            user,
            role: roles[0],

          }

        })
        .then(({ user, role }) => {

          return user
            .removeRole(role)
            .then(() => role)

        })
        .then(role => role.destroy())

    }

    it(`should have the admin role on the user with user id`, () => testAddRole({

      userId: user.id,

    }))

    it(`should have a the admin role on the user with user`, () => testAddRole({

      user: user,

    }))

  })

  describe(`findByCredentials`, () => {

    it(`should find the user based on the userAttributes username and password`, () => {
      
      return User.findByCredentials({

        username: userAttributes.username,
        password: userAttributes.password,

      })
      .then(user => expect(user).to.exist)

    })

    it(`should not find the user when the hashed password is used`, () => {
      
      return User.findByCredentials({

        username: userAttributes.username,
        password: user.password,

      })
      .then(user => expect(user).to.be.null)

    })

    it(`should not find the user when the username doesn't exist`, () => {
      
      return User.findByCredentials({

        username: `no-new-friends`,
        password: userAttributes.password,

      })
      .then(user => expect(user).to.be.null)

    })

  })

})