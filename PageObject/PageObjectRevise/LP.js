const {test,expect,page} =require('@playwright/test')



class LP {

 
    constructor(page){  
            this.page=page
            this.usernamefield=this.page.locator("#userEmail");
            this.passwordfield=this.page.locator("#userPassword");
            this.loginButton=page.getByRole('button', { name: 'Login' });

    }

    async gotopage(url) {
            await this.page.goto(url)
            await this.page.waitForLoadState("domcontentloaded")
        
    }    

    async login(username,password){
        await this.usernamefield.fill(username);
        await this.passwordfield.fill(password);
        await this.loginButton.click();
        
    }


}

module.exports={LP}