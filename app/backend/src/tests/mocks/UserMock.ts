const mockValidUser = {
id: 1,
username: 'avaliando os testes',
role: 'Teste',
password: 'secret_key',
email: 'user@test.com',
}

const mockInvalidUser = {
id: 1,
username: 'avaliando os testes',
role: 'Teste',
password: 'secret_key',
email: 'user@test.com',
}

const failureMessage = 'All fields must be filled';
const invalidDataMessage = 'Invalid email or password';

export {
  mockValidUser,
  mockInvalidUser,
  failureMessage,
  invalidDataMessage,
}