const {test, expect}=require('@playwright/test')



test('FirstPlaywrightTest',async ({browser})=>
{           const context=await browser.newContext();
            const page=await context.newPage();
            await page.goto("https://courses.rahulshettyacademy.com/");
}
);


test('IncorrectUsername',async ({page})=>
{
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
            await page.locator("#username").fill("test");
            await page.locator("#password").fill("test");
            await page.locator("#signInBtn").click();
            const errorMsg = await page.locator('[style*="block"]').textContent();
            console.log("Error Message:", errorMsg);
            await expect(page.locator('[style*="block"]')).toHaveText("eeee");
        
})


test('LogintoEcommerce',async ({page})=>
{
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
            await page.locator("#username").fill("rahulshettyacademy");
            await page.locator("#password").fill("learning");
            await page.locator("#signInBtn").click();
            
            const firstProduct = await page.locator('.card-title a').first().textContent();
            console.log("First Product:", firstProduct);

            
            

            // first method to grab all selectors and then extract the value out of it .
            const allTitles=await page.locator('.card-title a').all();
            for(let i=0;i<allTitles.length;i++){
                const value=await allTitles[i].innerText();
                console.log(value);
            }


            //method 2 
            const allTitles2=await page.locator('.card-title a').allTextContents();
            console.log(allTitles2);
        }
    )
           

test('Login_additems', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    const title=await page.title();
    console.log(title)

    await page.locator("#userEmail").fill('priyalal2792@gmail.com');
    await page.locator("#userPassword").fill('Tieto@123#');
    await page.click('#login');

    const title1=await page.locator('.card-body h5').first().textContent();
    console.log(title1)

    const titles=await page.locator('.card-body h5').allTextContents();
    console.log(titles)
    
})


