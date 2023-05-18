const mockValidUser = {
id: 1,
username: 'Admin',
role: 'admin',
email: 'admin@admin.com',
password: 'secret_admin',
}

const mockInvalidUser = {
id: 1,
username: 'avaliando os testes',
role: 'Teste',
email: 'user@test.com',
password: 'secret_key',
}

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