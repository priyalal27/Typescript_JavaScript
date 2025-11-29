const { test } = require('@playwright/test')

test.beforeAll(async()=>{

    console.log("Running this beforeALL hook at staring ")

})

test.afterAll(async()=>{

    console.log("Running this afterALL hook at staring ")

})



test.beforeEach(async()=>{
        console.log("Running this hook before each test case ")

})


test.afterEach(async()=>{


    console.log("Running this hook after each test case")
})

test('test_01', async ({ page }) => {
    await page.goto('https://www.google.com')
    await page.waitForTimeout(1000)
})


test('test_02', async ({ page }) => {
    await page.goto('https://www.google.com')
    await page.waitForTimeout(1000)
})



test('test_03', async ({ page }) => {
    await page.goto('https://www.google.com')
    await page.waitForTimeout(1000)
})



test('test_04', async ({ page }) => {
    await page.goto('https://www.google.com')
    await page.waitForTimeout(1000)
})



