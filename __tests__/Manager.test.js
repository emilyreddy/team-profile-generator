const Manager = require('../lib/Manager');

test('test_office_number', () => {
  const testOfficeNumber = 1;
  const employee = new Manager(
    'testName', 1, 'test@testemail.com',
    testOfficeNumber
  );
  expect(employee.officeNumber).toBe(testOfficeNumber);
});

test('test_getRole()_to_return_name', () => {
  const testRole = 'Manager';
  const employee = new Manager('testName', 1, 'test@testemail.com', 1);
  expect(employee.getRole()).toBe(testRole);
});

test('test_getOfficeNumber()_to_return_number', () => {
  const testGetOffice = 1;
  const employee = new Manager('testName', 1, 'test@testemail.com', testGetOffice);
  expect(employee.getOfficeNumber()).toBe(testGetOffice);
});