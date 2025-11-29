const {test,expect,request}=require('@playwright/test')
const path = require('path')

let webcontext;

test.beforeAll(async({browser})=>{
      const context=await browser.newContext()
      const page=await context.newPage()
      await page.goto("https://rahulshettyacademy.com/client/")
      await page.getByRole('textbox', { name: 'email@example.com' }).fill("priyalal2792@gmail.com");
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill("Tieto@123#");
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForTimeout(5000)
      await page.waitForLoadState('domcontentloaded')
      // storing all cookies in json file 
      // creating new context and passing this context further 
      await context.storageState({path:"storage.json"})  
      webcontext=await browser.newContext({storageState:'storage.json'})


})




test('Storage testing', async ()=>{
    //   await page.goto("https://rahulshettyacademy.com/client/")
    //   await page.getByRole('textbox', { name: 'email@example.com' }).fill("priyalal2792@gmail.com");
    //   await page.getByRole('textbox', { name: 'enter your passsword' }).fill("Tieto@123#");
    //   await page.getByRole('button', { name: 'Login' }).click();
      let page=await webcontext.newPage()
      await page.goto("https://rahulshettyacademy.com/client/#/dashboard/")
      await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('button', { name: ' Add To Cart' }).click()
      await page.getByRole('button', { name: '   Cart' }).click()
      await page.getByRole('button', { name: 'Checkout❯' }).click()
      await page.locator('input[type="text"]').nth(1).fill('123')
      await page.locator('input[type="text"]').nth(2).fill('Priya')
      await page.locator('input[name="coupon"]').fill('rahulshettyacademy')
      await page.getByRole('button', { name: 'Apply Coupon' }).click()
      await expect( page.getByText('* Coupon Applied')).toContainText('Coupon Applied')
      await page.getByPlaceholder('Select Country').pressSequentially('India')
      await page.getByRole('button', { name: ' India' }).click()
      await page.getByText('Place Order').click()
      await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toContainText('Thankyou for the order.')
      const value=await page.locator("label.ng-star-inserted").allTextContents()
      console.log(value)
})


test('visual testing',async({page})=>{
        await page.goto("https://timesofindia.indiatimes.com/")
        expect(await page.screenshot()).toMatchSnapshot('landing_page.png')
})