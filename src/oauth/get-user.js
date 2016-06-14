
import { User } from '../model/user'

export const getUser = (username, password, done) => {
      
  return User
    .findByCredentials({

      username,
      password,

    })
    .then(user => done(null, user))

}