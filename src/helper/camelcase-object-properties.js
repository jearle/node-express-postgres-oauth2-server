
import camelcase from 'camelcase'

export const camelcaseObjectProperties = (object) => {

  return Object
    .keys(object)
    .reduce((current, next) => {

      current[camelcase(next)] = object[next]
      
      return current

    }, {})

}