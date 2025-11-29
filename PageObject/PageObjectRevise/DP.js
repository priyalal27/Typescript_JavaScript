const {test,expect,page} =require('@playwright/test')


class DP{


    constructor(page){
        this.page = page;
        this.cardbody = this.page.locator('.card-body h5');
    }


     async add_to_cart() {
        // Wait for products to be visible instead of specific text
        await expect(this.cardbody.first()).toBeVisible({ timeout: 15000 });

        const titles = await this.cardbody.allTextContents(); 
        console.log("Product Titles:", titles);

        for (let i = 0; i < titles.length; i++) {
            const title = titles[i];
            await this.page.locator(`.card-body:has(h5:has-text("${title}")) >> text=Add To Cart`).click(); 
        }
    }


}


module.exports={DP}