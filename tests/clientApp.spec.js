import { test,expect,request } from '@playwright/test';
import { url } from 'inspector';


// if i want to run test cases in parallel in same file
test.describe.configure({mode:'parallel'});



test('uicomponent', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.pause();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  
  await page.locator("#username").fill('rahulshettyacademy');
  await page.locator("#password").fill('learning');

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");

  await page.click("label:nth-child(2) > .checkmark"); 
  await page.getByRole('button', { name: 'Okay' }).click();

  await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).click();
  //await expect(page.locator("#terms")).toBeChecked();

  await expect(page.locator('[href="https://rahulshettyacademy.com/documents-request"]')).toHaveAttribute('class', 'blinkingText');

  // ✅ Open child window and perform actions
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // wait for new page to open
    page.getByRole('link', { name: 'Free Access to InterviewQues/' }).click()
  ]);

  await newPage.waitForLoadState();
  const text = await newPage.locator(".red").textContent();
  console.log("Child window text:", text);

  const emailHref = await newPage.locator('//p[@class="im-para red"]//a').getAttribute('href');
  console.log("Email Href:", emailHref);
  const list=emailHref.split('@');
   console.log(list[1])

   
  await page.bringToFront();

   //await page.locator("#username").fill(list[1]);
  
    await page.getByRole('button', { name: 'Sign In' }).click();
   

});



test('@smk e2e_addtocart', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill('priyalal2792@gmail.com');
  await page.locator("#userPassword").fill('Tieto@123#');
  await page.click('#login');

  //await page.waitForSelector('.card-body h5');
  await page.locator('.card-body h5').first().waitFor();
  const titles = await page.locator('.card-body h5').allTextContents();
  console.log("Product Titles:", titles);

    for (let i = 0; i < titles.length; i++) {
        const title = titles[i];
        await page.locator(`.card-body:has(h5:has-text("${title}")) >> text=Add To Cart`).click();
    }
     //await page.pause()
    await page.getByRole('button', { name: '   Cart' }).click();
    await page.getByRole('button', { name: 'Checkout❯' }).click();
    await page.locator('input[type="text"]').nth(1).fill('222');
    await page.locator('input[type="text"]').nth(2).fill('Priya');
    await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    expect(await page.getByText('* Coupon Applied').isVisible());
    expect(await page.locator('input[type="text"]').nth(4).textContent('priyalal2792@gmail.com'));
    await page.waitForLoadState('networkidle');
    //(await page.waitForSelector("'button', { name: 'Apply Coupon' )")).isVisible();
    await page.waitForTimeout(5000);
    await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially('India');
    await page.waitForSelector("//button[.//i[contains(@class, 'fa-search')] and normalize-space(.)='India']");
    await page.locator("//button[.//i[contains(@class, 'fa-search')] and normalize-space(.)='India']").click();
    await page.getByText('Place Order').click();
    expect(await page.getByRole('heading', { name: 'Thankyou for the order.' }).textContent('Thankyou for the order.'));
    await page.waitForTimeout(5000);
    const order_ids= await page.locator("label.ng-star-inserted").allTextContents();
    console.log(order_ids);
    await page.click("//*[contains(text(),'Orders History Page')]");
    //await page.pause();
   for (let i = 0; i < order_ids.length; i++) {
   expect(await page.getByRole('rowheader', { name: `${order_ids[i]}` }).isVisible());
}


   



});


test('@smk Special Locators', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.locator('form input[name="name"]').fill("Priya")
    await page.locator('input[name="email"]').fill("priyalal@gmail.com")
    await page.getByRole('textbox', { name: 'Password' }).fill("kfrfifn")
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check()
    const dropdown=page.getByLabel('Gender')
    await dropdown.selectOption('Female')
    await page.getByRole('radio', { name: 'Employed' }).click()
    await page.locator('input[name="bday"]').dblclick()
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.getByRole('link', { name: 'Shop' }).click()


    //chaining --> locator > filter > again locator > action 
    await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole("button").click()
   

})


// let token;

// test.beforeAll(async(request)=>{
//   const response = await request.post(
//             'https://rahulshettyacademy.com/api/ecom/auth/login',
//             {
//               data: {
//                 userEmail: 'priyalal2792@gmail.com',
//                 userPassword: 'Tieto@123#',
//               },
//             }
//           );
        
//           const responseBody = await response.json();
//           console.log('Login Response:', responseBody);
        
//           token = responseBody.token;
      
// })


test('Using chaining/filter', async ({ browser, request }) => {
  const val = {
    userEmail: 'priyalal2792@gmail.com',
    userPassword: 'Tieto@123#',
  };

  const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: val
  });

  const responseBody = await response.json();
  const token = responseBody.token;
  console.log("Token:", token);

  // Launch new context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the site to initialize localStorage
  await page.goto("https://rahulshettyacademy.com/client/", {
    waitUntil: 'domcontentloaded',
  });

  // Inject token into localStorage
  await page.evaluate((tokenVal) => {
    localStorage.setItem('token', tokenVal);
  }, token);

  // Navigate to dashboard after setting token
  await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash", {
    waitUntil: 'domcontentloaded'
  });

  // Optionally, assert some element to confirm login worked
  await page.waitForSelector(".card-body");
});


//   await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
    //   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('button', { name: ' Add To Cart' }).click()
    //   await page.getByRole('button', { name: '   Cart' }).click()
    //   await page.getByRole('button', { name: 'Checkout❯' }).click()
    //   await page.locator('input[type="text"]').nth(1).fill('123')
    //   await page.locator('input[type="text"]').nth(2).fill('Priya')
    //   await page.locator('input[name="coupon"]').fill('rahulshettyacademy')
    //   await page.getByRole('button', { name: 'Apply Coupon' }).click()
    //   await expect( page.getByText('* Coupon Applied')).toContainText('Coupon Applied')
    //   await page.getByPlaceholder('Select Country').pressSequentially('India')
    //   await page.getByRole('button', { name: ' India' }).click()
    //   await page.pause()
    //   await page.getByText('Place Order').click()
    //   await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toContainText('Thankyou for the order.')
    //   const value=await page.locator("label.ng-star-inserted").allTextContents()
    //   console.log(value)
    //   await page.getByText('Orders History Page').click();
    //   await page.waitForSelector('text=Your Orders')
    //  const deleteButtons = page.locator("//tbody//td//button[text()='Delete']");
    //  const count = await deleteButtons.count();


     


//})


test('Hidden_and_Display_Alert_iframe', async ({page})=>{
          await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
          await expect(page.getByRole('textbox', { name: 'Hide/Show Example' })).toBeVisible()
          await page.getByRole('button', { name: 'Hide' }).click()
          await expect(page.getByRole('textbox', { name: 'Hide/Show Example' })).toBeHidden()
         
          await page.click('#alertbtn');
          page.on('dialog', daillog=>daillog.accept())
          await page.locator('#mousehover').hover()
          await page.click('#mousehover')
        const ifrm=page.frameLocator('#courses-iframe')
        await ifrm.getByRole("link",{name:'NEW All Access plan'}).click()
        await expect(ifrm.locator('h1')).toHaveText('All Access Subscription')  
        await page.pause()
        const v=await ifrm.getByRole('heading', { name: 'Join 13,522 Happy Subscibers!' }).textContent()
        console.log(v)  

})

test('appzen',async({page})=>{
      await page.goto("https://console.rcst.dev.appzen.com/console/home.html#/")
      await page.pause()



})



