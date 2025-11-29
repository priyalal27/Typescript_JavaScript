const {POMManager}=require('./POMManager')
const {test}=require('@playwright/test')
const fs=require('fs')
const path=require('path')

const Customtest=require('./test-base')

const dataset=JSON.parse(fs.readFileSync(path.join(__dirname,'../../utils/testdata/userdetails.json'),'utf-8'))




for (const user of dataset) {
  test(`testing e2e ${user.username}`, async ({ page }) => {

    let PM=new POMManager(page);
    let login=PM.getLP();
    await login.gotopage("https://rahulshettyacademy.com/client")
    await login.login(user.username,user.password)

    let dashboard=PM.getDP();
    await dashboard.add_to_cart()


    let checkout=PM.getCOP();
    await checkout.placeorder()


})}



// Customtest("using fixtures", async({page,Customtest})=>{
//                     let PM=new POMManager(page);
//     let login=PM.getLP();
//     await login.gotopage("https://rahulshettyacademy.com/client")
//     await login.login(Customtest.username,Customtest.password)

//     let dashboard=PM.getDP();
//     await dashboard.add_to_cart() 
// })