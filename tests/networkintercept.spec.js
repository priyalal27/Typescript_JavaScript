const { test, expect, request } = require('@playwright/test');
const path = require('path');
const { json } = require('stream/consumers');

let token;
let order_IDS;
let fakepayload = { "message": "No Product in Cart" }



test.describe.configure({mode:"serial"});

test.beforeAll(async ({ request }) => {
    let response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: { "userEmail": "priyalal2792@gmail.com", "userPassword": "Tieto@123#" }
        })
    let body = await response.json()
    console.log(body)
    token = body.token;
    console.log("Token ", token)


})



test('LoginviaAPI', async ({ page, request }) => {
    console.log("abc")

    // get all product
    let get_all_product_body = await request.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products", {
        headers: {
            Authorization: token,
            Accept: "application/json, text/plain, */*",
            "X-XSRF-TOKEN": "eyJpdiI6ImRsb2pSc0s5TjM4MGE4cGNRWjlyYnc9PSIsInZhbHVlIjoiNTd1bEJqa01FOXpnOE9Rd0x1R2ZBalpSenNhMmpoTzltUU5iQW9FdWNCa0VUTmtKdUtMY0s1Zjh3d1dtbTJpZDZMUmM1dU81eFlnUTZFbnp6ZFBRTm9Gc2VaRVBERlRaSGZQWVpTYzlqMzN3d3NnU29EeHF3M1hiTFdsTlB4bEYiLCJtYWMiOiI3MTc4YjAxYjAxOGEwZTczZjhkMmQxYmFlYWUyNGFlOTRmNjViNjY1NGQ5OTRkZDE1MjcxM2M3ZGQ3MzRlOWM4IiwidGFnIjoiIn0="
        },
        data: { "productName": "", "minPrice": null, "maxPrice": null, "productCategory": [], "productSubCategory": [], "productFor": [] }
    })

    let json_body = await get_all_product_body.json()
    order_IDS = await json_body.data.map(a => a._id)
    console.log(order_IDS)



    //add_to_cart
    let add_to_cart = await request.post("https://rahulshettyacademy.com/api/ecom/user/add-to-cart", {
        headers: {
            Authorization: token,
            Accept: "application/json, text/plain, */*",
            "X-XSRF-TOKEN": "eyJpdiI6ImRsb2pSc0s5TjM4MGE4cGNRWjlyYnc9PSIsInZhbHVlIjoiNTd1bEJqa01FOXpnOE9Rd0x1R2ZBalpSenNhMmpoTzltUU5iQW9FdWNCa0VUTmtKdUtMY0s1Zjh3d1dtbTJpZDZMUmM1dU81eFlnUTZFbnp6ZFBRTm9Gc2VaRVBERlRaSGZQWVpTYzlqMzN3d3NnU29EeHF3M1hiTFdsTlB4bEYiLCJtYWMiOiI3MTc4YjAxYjAxOGEwZTczZjhkMmQxYmFlYWUyNGFlOTRmNjViNjY1NGQ5OTRkZDE1MjcxM2M3ZGQ3MzRlOWM4IiwidGFnIjoiIn0="
        },
        data: { "_id": "67f506fbfc76541aad250e7a", "product": { "_id": "67a8dde5c0d3e6622a297cc8", "productName": "ZARA COAT 3", "productCategory": "fashion", "productSubCategory": "shirts", "productPrice": 31500, "productDescription": "Adidas Originals", "productImage": "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg", "productRating": "0", "productTotalOrders": "0", "productStatus": true, "productAddedBy": "admin@gmail.com", "__v": 0, "productFor": "family" } }
    })
    let json_body_add_to_cart = await add_to_cart.json()
    let productName = await json_body_add_to_cart.message;
    console.log(productName)


    //place_order
    let place_order = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        headers: {
            Authorization: token,
            Accept: "application/json, text/plain, */*",
            "X-XSRF-TOKEN": "eyJpdiI6ImRsb2pSc0s5TjM4MGE4cGNRWjlyYnc9PSIsInZhbHVlIjoiNTd1bEJqa01FOXpnOE9Rd0x1R2ZBalpSenNhMmpoTzltUU5iQW9FdWNCa0VUTmtKdUtMY0s1Zjh3d1dtbTJpZDZMUmM1dU81eFlnUTZFbnp6ZFBRTm9Gc2VaRVBERlRaSGZQWVpTYzlqMzN3d3NnU29EeHF3M1hiTFdsTlB4bEYiLCJtYWMiOiI3MTc4YjAxYjAxOGEwZTczZjhkMmQxYmFlYWUyNGFlOTRmNjViNjY1NGQ5OTRkZDE1MjcxM2M3ZGQ3MzRlOWM4IiwidGFnIjoiIn0="
        },
        data: { "orders": [{ "country": "India", "productOrderedId": "67a8dde5c0d3e6622a297cc8" }] }
    })
    let json_body_place_order = await place_order.json()
    let orders = await json_body_place_order.orders[0];
    let productOrderId = await json_body_place_order.productOrderId[0];
    let message = await json_body_place_order.message;
    console.log("orders : ", orders)
    console.log("productOrderId : ", productOrderId)
    console.log("message : ", message)

    // get order details 
    let final_order = await request.get(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67f506fbfc76541aad250e7a",
        {
            headers: {
                Authorization: token,
                Accept: "application/json, text/plain, */*",
            }
        }
    )
    let response_body = await final_order.json();
    console.log("Get Order Details:", response_body);
    let OD_ID = await response_body.data.map(b => b._id)
    console.log(OD_ID)


    
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67f506fbfc76541aad250e7a",
        async (route, requestObj) => {
            console.log("Intercepted get-orders-for-customer call");
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fakepayload),
            });
        }
    );

    // After setting up the route, navigate to the client app
    await page.goto("https://rahulshettyacademy.com/client");

    // Inject the token into localStorage before page reload
    await page.evaluate((token) => {
        localStorage.setItem("token", token);
    }, token);

    // Reload to apply the login
    await page.reload();

    // Optionally wait or assert if frontend reacts to mocked data
    await page.waitForTimeout(3000);







});


test('Networks continue', async ({ page }) => {
    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route =>
            route.continue({
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"
            })
    );

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByRole('textbox', { name: 'email@example.com' }).fill("priyalal2792@gmail.com");
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill("Tieto@123#");
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForLoadState('domcontentloaded');
    await page.locator("//button[contains(text(),'ORDERS')]").click();
    await page.locator("//button[contains(text(),'View')]").first().click()
    await page.waitForTimeout(5000); // wait for orders to load
    await page.getByText('You are not authorize to view')
    
});

test('Network Abort Call',async ({page})=>{
        await page.goto("https://rahulshettyacademy.com/client/");
        await page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
        
        //when we go to the page , at backend certain APIs are called, which we can intercept
        await page.on('request',request=>console.log(request.url()))
        console.log("-----------------------------------------------------------------------")
        await page.on('response',response=>console.log(response.status()))


        await page.getByRole('textbox', { name: 'email@example.com' }).fill("priyalal2792@gmail.com");
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill("Tieto@123#");
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForLoadState('domcontentloaded');
    //screenshot
    await page.screenshot({path:'screenshot.png'})
    //screenshot on a particular webelement 
    await page.locator("//button[contains(text(),'ORDERS')]").screenshot({path:'element.png'})
    await page.locator("//button[contains(text(),'ORDERS')]").click();
    await page.locator("//button[contains(text(),'View')]").first().click()
    await page.waitForTimeout(5000); // wait for orders to load
    
    


})
