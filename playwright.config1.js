// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports={
  globalSetup:'./global-setup.js',
  globalTeardown:'./global-teardown'
};

export default defineConfig({

  
  //testDir:'./test',
  timeout:40000,
  workers: 5, // Run 3 tests files in parallel, but test cases inside them will run in sequential manner 
  // if i want to run test cases in parallel in same file------> test.describe.configure({mode:'parallel'});
 // if i want to run test cases in serial mode in same file , that means all the test cases are in interdependent --> test.describe.configure({mode:'serial'});
  //re-ran the flaky test cases --> failed test case will be retried for one more time .
  retries:1,  
 
 
 
  // if i want to do cross browser testing 
  //npx playwright test tests/WebAPI.spec.js --grep "e2e" --config playwright.config1.js --project='Safari'
  // if no project provided , it will run on all the browsers.

  projects:[
  //   {
  //   name:"Safari",
  //   use: {
  //   browserName: 'webkit',
  //   headless: false,
  //   slowMo: 2000,
  //   trace:'retain-on-failure',
  //   screenshot:'on',
  //   //dimensions for the window size
  //   viewport:{width:720,height:720}
  // }
  // }
  // ,
  {
    name:"Chrome",
    use: {
    browserName: 'chromium',
    headless: false,
    slowMo: 2000,
    trace:'on',
    screenshot:'only-on-failure',
    ignoreHTTPSErrors: true,
    //handle ssl certificate error 
    ignoreHttpsErrors:true,
    //video of test execution 
    video:'retain-on-failure',
    
  }
  }
],





    
});

