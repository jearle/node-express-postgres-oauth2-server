import { User } from '../../src/model/user'

const userAttributes = {

  username: 'dev.user@dev.com',
  password: 'dev-password',
  name: 'Dev User',
  profileUrl: 'http://google.com/dev-image.jpg',

}

User
  .create(userAttributes)
  .then(() => console.log('dev user created'))