
import { hash as bcrypt, compare as bcompare } from 'bcrypt'

export const hash = (string, iterations) => {

  return new Promise((resolve, reject) => {
    
    return bcrypt(string, iterations, (err, hash) => {

      if (err) {

        return reject(err)

      }

      return resolve(hash)

    })

  })

}

export const compare = (string, hash) => {

  return new Promise((resolve, reject) => {

    return bcompare(string, hash, (err, result) => {
      // console.log(result)
      if (err) {

        return reject(err)

      }

      return resolve(result)

    })

  })

}