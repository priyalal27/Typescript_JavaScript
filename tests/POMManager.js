const { CheckoutPage } = require('../PageObject/CheckoutPage')
const { DashboardPage } = require('../PageObject/DashboardPage')
const { LoginPage } = require('../PageObject/LoginPage')


class POMManager{


    constructor(page){
            this.loginpage=new LoginPage(page)
            this.checkout=new CheckoutPage(page)
            this.dashboard=new DashboardPage(page)
            
    }

    getLoginPage(){
        return this.loginpage
    }


    getCheckoutPage(){
        return this.checkout
    }

    getDashboardPage(){
        return this.dashboard
    }

    

}

module.exports={POMManager}