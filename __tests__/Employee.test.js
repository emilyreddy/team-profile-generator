const Employee = require('../lib/Employee');

test('test_Employee_object', () => {
  const employeeTest = new Employee();
  expect(typeof employeeTest).toBe('object');
});

test('test_name_from_constructor', () => {
  const testName = 'testName';
  const employee = new Employee(testName);
  expect(employee.name).toBe(testName);
});

test('test_ID_from_constructor', () => {
  const testID = '1';
  const employee = new Employee('testName', testID);
  expect(employee.id).toBe(testID);
});

test('test_email_from_constructor', () => {
  const testEmail = 'testName@testemail.com';
  const employee = new Employee('testName', 1, testEmail);
  expect(employee.email).toBe(testEmail);
});