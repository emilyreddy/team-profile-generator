const Intern = require('../lib/Intern');

test('test_school_from_constructor', () => {
  const testSchool = 'testSchool';
  const employee = new Intern('testName', 1, 'test@testemail.com', testSchool);
  expect(employee.school).toBe(testSchool);
});

test('test_getRole()_method', () => {
  const testRole = 'Intern';
  const employee = new Intern('testName', 1, 'test@testemail.com', 'testSchool');
  expect(employee.getRole()).toBe(testRole);
});

test('test_getSchool()_method', () => {
  const testGetSchool = 'testSchool';
  const employee = new Intern('testName', 1, 'test@testemail.com', testGetSchool);
  expect(employee.getSchool()).toBe(testGetSchool);
});