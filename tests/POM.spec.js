const {test,page,expect}=require('@playwright/test')
const { POMManager } = require('./POMManager');
const { getSecret } = require('../utils/aws-secrets-manager');

test.beforeAll(async () => {
  // Fetch the secret before running any tests
  const credentials = await getSecret();
  process.env.TEST_USERNAME = credentials.username;
  process.env.TEST_PASSWORD = credentials.password;
});

test('e2e_POM with Secrets Manager', async({page})=>{
        let POM=new POMManager(page)

        console.log("Starting e2e_POM test with Secrets Manager");
        const login=POM.getLoginPage()
        console.log("LoginPage object created");
        
        try {
            console.log("Attempting to navigate to page");
            await login.gotopage("https://rahulshettyacademy.com/client");
            console.log("Successfully navigated to page");
            
            console.log("Attempting to login");
            await login.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD)
            console.log("Login completed successfully");


            // Dashboard 
            console.log('Adding items to the cart')
            const dashboard=POM.getDashboardPage()
            await dashboard.add_to_cart()

            // gotocart
            console.log("checkout")
            const chekout=POM.getCheckoutPage()

            await chekout.placeorder()


        } catch (error) {
            console.error("Error in e2e_POM test:", error);
            throw error;
        }
})

// Example of different test categories
test('smoke test - basic login', async({page}) => {
    console.log("Running smoke test");
    // Basic login test
});

test('regression test - full checkout flow', async({page}) => {
    console.log("Running regression test");
    // Full checkout flow
});

test('critical test - payment validation', async({page}) => {
    console.log("Running critical test");
    // Payment validation
});