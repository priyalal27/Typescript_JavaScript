//const {test,expect,page} =require('@playwright/test')


class COP{


    constructor(page){

        this.page=page
        this.cartbutton=this.page.locator('button[routerlink="/dashboard/cart"]')
        this.checkoutbutton=this.page.getByRole('button', { name: 'Checkout❯' })
        this.cvv=this.page.locator('input[type="text"]').nth(1);
        this.name0ncard=this.page.locator('input[type="text"]').nth(1);
        this.country=this.page.getByRole('textbox', { name: 'Select Country' })


    }


    async placeorder(){
            console.log("Clicking cart button");
            await this.cartbutton.click();
            
            console.log("Waiting for checkout button");
            await this.page.waitForLoadState('networkidle');
            
            console.log("Clicking checkout button");
            await this.checkoutbutton.click();
            
            console.log("Filling CVV");
            await this.cvv.fill('2222')
            
            console.log("Filling name on card");
            await this.name0ncard.fill('Priya')
            
            console.log("Waiting for page to load");
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);

            console.log("Selecting country");
            await this.page.getByRole('textbox', { name: 'Select Country' }).pressSequentially('India');
            await this.page.waitForTimeout(1000);

            console.log("Clicking India option");
            await this.page.waitForSelector("//button[contains(., 'India')]");
            await this.page.click("//button[contains(., 'India')]");

            console.log("Placing order");
            await this.page.getByText('Place Order').click();

            console.log("Verifying order confirmation");
            await expect(this.page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();
            console.log("Order placed successfully!");

    }



}


module.exports={COP}