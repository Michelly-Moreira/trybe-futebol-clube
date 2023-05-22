const mockValidUser = {
id: 1,
username: 'Admin',
dataValues: {
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }
} // senha: secret_admin

const mockInvalidUser = {
id: 1,
username: 'User',
role: 'user',
email: '@user.com',
password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
} // senha: secret_user

const failureMessage = 'All fields must be filled';
const invalidDataMessage = 'Invalid email or password';
const withoutToken = 'Token not found';
const invalidToken = 'Token must be a valid token'

export {
  mockValidUser,
  mockInvalidUser,
  failureMessage,
  invalidDataMessage,
  withoutToken,
  invalidToken,
}