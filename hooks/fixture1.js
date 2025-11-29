const { test: base } = require('@playwright/test');

exports.customTest = base.extend(

    {
        authenticatedPage: async({page},use)=>{
               await page.goto("https://www.google.com/")

               await use(page);

               await page.reload();

               await page.close();
        }
    }



);