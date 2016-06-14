
export const grantTypeAllowed = (clientId, grantType, done) => {

  if (clientId === '08215ea7-e7d3-4eca-a80d-f1080e7fc680' &&
      (grantType === 'password' ||
       grantType === 'refresh_token'))

    done(null, true)

  else

    done(`Grant type ${ grantType } not allowed for ${ clientId }`)

}