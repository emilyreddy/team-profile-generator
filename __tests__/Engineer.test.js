const Engineer = require('../lib/Engineer');

test('test_GitHub_account', () => {
  const testGithubAccount = 'testUsername';
  const employee = new Engineer(
    'testName', 1, 'test@testemail.com',
    testGithubAccount
  );
  expect(employee.github).toBe(testGithubAccount);
});

test('test_getRole()_method', () => {
  const testRole = 'Engineer';
  const employee = new Engineer(
    'testName', 1, 'test@testemail.com', 'testUsername'
  );
  expect(employee.getRole()).toBe(testRole);
});

test('test_getGithub()_method', () => {
  const testGitHubUser = 'testUsername';
  const employee = new Engineer('testName', 1, 'test@testemail.com', testGitHubUser);
  expect(employee.getGithub()).toBe(testGitHubUser);
});