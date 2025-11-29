const { test, expect } = require('@playwright/test');

// Method 1: Using test annotations (similar to pytest markers)
test.describe('E-commerce Test Suite', () => {
    
    test('@smoke @login basic login functionality', async ({ page }) => {
        console.log('Running smoke test for login');
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('priyalal2792@gmail.com');
        await page.locator('#userPassword').fill('Tieto@123#');
        await page.click('#login');
        await expect(page.locator('.card-body h5').first()).toBeVisible();
    });

    test('@regression @checkout full checkout process', async ({ page }) => {
        console.log('Running regression test for checkout');
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('priyalal2792@gmail.com');
        await page.locator('#userPassword').fill('Tieto@123#');
        await page.click('#login');
        
        // Add items to cart
        const titles = await page.locator('.card-body h5').allTextContents();
        for (let i = 0; i < titles.length; i++) {
            await page.locator(`.card-body:has(h5:has-text("${titles[i]}")) >> text=Add To Cart`).click();
        }
        
        // Go to cart
        await page.locator('button[routerlink="/dashboard/cart"]').click();
        await expect(page.getByRole('button', { name: 'Checkout❯' })).toBeVisible();
    });

    test('@critical @payment payment validation', async ({ page }) => {
        console.log('Running critical test for payment');
        // Payment validation logic
        expect(true).toBeTruthy();
    });

    test('@integration @api API integration test', async ({ page }) => {
        console.log('Running integration test for API');
        // API integration logic
        expect(true).toBeTruthy();
    });
});

// Method 2: Using test.describe for grouping
test.describe('User Management', () => {
    test('should create new user', async ({ page }) => {
        console.log('Creating new user');
        expect(true).toBeTruthy();
    });

    test('should update user profile', async ({ page }) => {
        console.log('Updating user profile');
        expect(true).toBeTruthy();
    });
});

// Method 3: Using test.describe with conditional execution
test.describe('Performance Tests', () => {
    test('should load page within 3 seconds', async ({ page }) => {
        console.log('Testing page load performance');
        const startTime = Date.now();
        await page.goto('https://rahulshettyacademy.com/client');
        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(3000);
    });
}); 