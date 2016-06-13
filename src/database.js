
import Sequelize from 'sequelize'

const {

  DATABASE_URL,
  NODE_ENV,

} = process.env

const options = {}

if (NODE_ENV === 'test')
  options.logging = false

export const db = new Sequelize(DATABASE_URL, options)