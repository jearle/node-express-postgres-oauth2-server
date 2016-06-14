
import { getAccessToken } from './get-access-token'
import { getClient } from './get-client'
import { grantTypeAllowed } from './grant-type-allowed'
import { saveAccessToken } from './save-access-token'
import { saveRefreshToken } from './save-refresh-token'
import { getRefreshToken } from './get-refresh-token'
import { getUser } from './get-user'

export const model = {

  getAccessToken,
  getClient,
  grantTypeAllowed,
  saveAccessToken,
  saveRefreshToken,
  getRefreshToken,
  getUser,

}