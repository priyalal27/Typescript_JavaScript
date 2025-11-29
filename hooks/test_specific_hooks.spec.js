const { page, expect,test } = require('@playwright/test');
const { customTest } = require('./fixture1');

test.describe('Login test', () => {

  test.beforeAll(async () => {
    console.log("before all hook");
  });

  test.afterAll(async () => {
    console.log("after all hook");
  });

  test('Login with valid creds', async () => {
    console.log("valid creds");
  });

  test('Login with invalid creds', async () => {
    console.log("invalid creds");
  });

});


customTest("Custom hook authentication", async ({authenticatedPage})=>{
  console.log("This test uses the authenticatedPage fixture.");
});