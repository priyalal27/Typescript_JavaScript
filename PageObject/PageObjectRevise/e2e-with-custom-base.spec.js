const { Customtest } = require('./test-base');
const { POMManager } = require('./POMManager');

// Customtest('testing e2e with custom base', async ({ page, testDataForOrder }) => {
//     console.log('Using test data:', testDataForOrder);
    
//     let PM = new POMManager(page);
//     let login = PM.getLP();
    
//     await login.gotopage("https://rahulshettyacademy.com/client");
//     await login.login(testDataForOrder.username, testDataForOrder.password);
    
//     console.log('Login completed successfully');
// }); 