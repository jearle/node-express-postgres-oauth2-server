
import { expect } from 'chai'

import { camelcaseObjectProperties } from '../../../src/helper/camelcase-object-properties'

describe(`camelcaseObjectProperties`, () => {

  it(`should camelize properties`, () => {
      
    const object = {

      key_one: '',
      key_two: '',

    }

    const camelcasedObject = camelcaseObjectProperties(object)

    const keys = Object.keys(camelcasedObject)

    expect(keys.indexOf('keyOne')).to.not.equal(-1)
    expect(keys.indexOf('keyTwo')).to.not.equal(-1)

  })

})