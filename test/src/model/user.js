
import { expect } from 'chai'

import { User } from '../../../src/model/user'

describe(`User`, () => {

  let user = null

  const userAttributes = {

    username: 'test.user@gmoney.sike',
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