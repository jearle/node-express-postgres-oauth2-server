
import { expect } from 'chai'

import { hash, compare } from '../../../src/helper/hash'

describe(`hash`, () => {

  it(`should hash and compare string`, () => {
      
    return hash('hello', 1)
      .then(res => {

        return compare('hello', res)

      })
      .then(res => {

        expect(res).to.equal(true)

      })

  })

})