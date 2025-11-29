import { test, expect, request } from '@playwright/test';

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: {
        userEmail: 'priyalal2792@gmail.com',
        userPassword: 'Tieto@123#',
      },
    }
  );

  const responseBody = await response.json();
  console.log('Login Response:', responseBody);

  token = responseBody.token;
});

test('e2e', async ({ page }) => {
  // Set token before any page loads
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client/');
  await page.locator('.card-body h5').first().waitFor();

  const titles = await page.locator('.card-body h5').allTextContents();
  console.log('Product Titles:', titles);

  for (const title of titles) {
    await page
      .locator(`.card-body:has(h5:has-text("${title}")) >> text=Add To Cart`)
      .click();
  }

  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button', { name: 'Checkout❯' }).click();

  await page.locator('input[type="text"]').nth(1).fill('222');
  await page.locator('input[type="text"]').nth(2).fill('Priya');
  await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
  await page.getByRole('button', { name: 'Apply Coupon' }).click();

  await expect(page.getByText('* Coupon Applied')).toBeVisible();
  await expect(page.locator('input[type="text"]').nth(4)).toHaveValue('priyalal2792@gmail.com');

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially('India');

  await page.waitForSelector("//button[contains(., 'India')]");
  await page.click("//button[contains(., 'India')]");

  await page.getByText('Place Order').click();

  await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();

  const order_ids = await page.locator('label.ng-star-inserted').allTextContents();
  console.log('Order IDs:', order_ids);

  await page.click("text=Orders History Page");

  for (const id of order_ids) {
    await expect(page.getByRole('rowheader', { name: id })).toBeVisible();
  }
});


test('e2e_API',async({page})=>{
    await page.addInitScript((token) => {
  window.localStorage.setItem('token', token);
      }, token);

        
  // Add items to cart using API
  const apiContext = await request.newContext({
    baseURL: 'https://rahulshettyacademy.com',
    extraHTTPHeaders: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  const cartItems = [
    {
      _id: '67f506fbfc76541aad250e7a',
      product: {
        _id: '67a8dde5c0d3e6622a297cc8',
        productName: 'ZARA COAT 3',
        productCategory: 'fashion',
        productSubCategory: 'shirts',
        productPrice: 31500,
        productDescription: 'Adidas Originals',
        productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg',
        productRating: '0',
        productTotalOrders: '0',
        productStatus: true,
        productAddedBy: 'admin@gmail.com',
        __v: 0,
        productFor: 'family',
      },
    },
    {
      _id: '67f506fbfc76541aad250e7a',
      product: {
        _id: '67a8df1ac0d3e6622a297ccb',
        productName: 'ADIDAS ORIGINAL',
        productCategory: 'fashion',
        productSubCategory: 'shirts',
        productPrice: 31500,
        productDescription: 'Addias Originals',
        productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg',
        productRating: '0',
        productTotalOrders: '0',
        productStatus: true,
        productFor: 'women',
        productAddedBy: 'admin@gmail.com',
        __v: 0,
      },
    },
    {
      _id: '67f506fbfc76541aad250e7a',
      product: {
        _id: '67a8df56c0d3e6622a297ccd',
        productName: 'IPHONE 13 PRO',
        productCategory: 'electronics',
        productSubCategory: 'mobiles',
        productPrice: 231500,
        productDescription: 'iphonenew',
        productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg',
        productRating: '0',
        productTotalOrders: '0',
        productStatus: true,
        productFor: 'women',
        productAddedBy: 'admin@gmail.com',
        __v: 0,
      },
    },
  ];

  for (const item of cartItems) {
    const res = await apiContext.post('/api/ecom/user/add-to-cart', {
      data: item,
    });
    expect(res.ok()).toBeTruthy();
  }

    //place order 
    const x_xsrf_token="eyJpdiI6IkdNdk8wM3NOZzVaYURlaWpFTEUzSXc9PSIsInZhbHVlIjoiWjVhTkZNSmVTaTN4OUkwOEdRaDliaVVpcEV5N3FuUnV1bHBoL1ZxQ0tneE5vdkFnZ2s0Q1JqbzJ6VWt3UGdqRUU5TEN4ZmRZUHdkNUVadGpwREtkaldHWk9kajJSY3ZWQ2tkY0NhTHN1MUJ5QURLYkhUZHFUbG5hWDJ2OUlsT0YiLCJtYWMiOiJhMGYwY2E0NjM0MDgyMTEwYTRhY2JlNmUxMzhiMzlkNjZjMWI5YzZjNDFhZWExZTM1OTA2OGFkZjdhM2VhYTlhIiwidGFnIjoiIn0="
    const place_order_body={"orders":[{"country":"India","productOrderedId":"67a8dde5c0d3e6622a297cc8"},{"country":"India","productOrderedId":"67a8df1ac0d3e6622a297ccb"},{"country":"India","productOrderedId":"67a8df56c0d3e6622a297ccd"}]}
    const place_order = await request.newContext({
        baseURL:"https://rahulshettyacademy.com",
        extraHTTPHeaders:{
            authorization:token,
            "content-type":"application/json",
            "x-xsrf-token":x_xsrf_token

        }
    })

    const response_place_order = await place_order.post("api/ecom/order/create-order",
        {data:place_order_body           
        }
    )

    const response_place_order_rponse = await response_place_order.json()
    console.log("response_place_order_rponse ",response_place_order_rponse)
    
    // Wait a moment for the order to be fully processed
    await page.waitForTimeout(2000)
    
    // goto cart n verify the orders 
    await page.goto("https://rahulshettyacademy.com/client")
    
    // Wait for the orders table to load
    await page.waitForSelector("//tbody//tr//th", { timeout: 10000 })
    
    const order_ids = await page.locator("//tbody//tr//th").allTextContents();
    console.log("order_ids ",order_ids)
    
    // Verify that we have orders
    expect(order_ids.length).toBeGreaterThan(0);
    

});