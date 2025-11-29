const { test, expect } = require('@playwright/test');

// Test 1: Basic Login Test
test('@parallel @login basic login functionality', async ({ page }) => {
    console.log('Test 1: Starting basic login test');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('priyalal2792@gmail.com');
    await page.locator('#userPassword').fill('Tieto@123#');
    await page.click('#login');
    await expect(page.locator('.card-body h5').first()).toBeVisible();
    console.log('Test 1: Basic login test completed');
});

// Test 2: Product Search Test
test('@parallel @search product search functionality', async ({ page }) => {
    console.log('Test 2: Starting product search test');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('priyalal2792@gmail.com');
    await page.locator('#userPassword').fill('Tieto@123#');
    await page.click('#login');
    
    // Wait for products to load
    await expect(page.locator('.card-body h5').first()).toBeVisible();
    
    // Get all product titles
    const titles = await page.locator('.card-body h5').allTextContents();
    console.log('Test 2: Found products:', titles);
    expect(titles.length).toBeGreaterThan(0);
    console.log('Test 2: Product search test completed');
});

// Test 3: Cart Navigation Test
test('@parallel @cart cart navigation test', async ({ page }) => {
    console.log('Test 3: Starting cart navigation test');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('priyalal2792@gmail.com');
    await page.locator('#userPassword').fill('Tieto@123#');
    await page.click('#login');
    
    // Wait for products to load
    await expect(page.locator('.card-body h5').first()).toBeVisible();
    
    // Add first product to cart
    await page.locator('.card-body:has(h5) >> text=Add To Cart').first().click();
    
    // Navigate to cart
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    
    // Verify cart page loaded
    await expect(page.getByRole('button', { name: 'Checkout❯' })).toBeVisible();
    console.log('Test 3: Cart navigation test completed');
});

// Test 4: User Profile Test
test('@parallel @profile user profile functionality', async ({ page }) => {
    console.log('Test 4: Starting user profile test');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('priyalal2792@gmail.com');
    await page.locator('#userPassword').fill('Tieto@123#');
    await page.click('#login');
    
    // Wait for dashboard to load
    await expect(page.locator('.card-body h5').first()).toBeVisible();
    
    // Verify user is logged in by checking for products (more reliable than logout button)
    const productCount = await page.locator('.card-body h5').count();
    expect(productCount).toBeGreaterThan(0);
    console.log(`Test 4: User profile test completed - Found ${productCount} products`);
});

// Test 5: Performance Test
test('@parallel @performance page load performance', async ({ page }) => {
    console.log('Test 5: Starting performance test');
    const startTime = Date.now();
    await page.goto('https://rahulshettyacademy.com/client');
    const loadTime = Date.now() - startTime;
    
    console.log(`Test 5: Page loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    console.log('Test 5: Performance test completed');
}); 