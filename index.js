
import { app } from './src/server'

const {

  PORT,

} = process.env

app
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))