class LoginPage{


    constructor(page){  
            this.page=page
            this.usernamefield=this.page.locator("#userEmail");
            this.passwordfield=this.page.locator("#userPassword");
            this.loginButton=page.getByRole('button', { name: 'Login' });

    }

    async gotopage(url) {
            await this.page.goto(url)
        
    }    

    async login(username,password){
        await this.usernamefield.fill(username);
        await this.passwordfield.fill(password);
        await this.loginButton.click();
        
    }

}

module.exports={LoginPage}
