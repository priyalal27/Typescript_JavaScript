const {COP}=require('./COP')
const {DP}=require('./DP')
const {LP}=require('./LP')




class POMManager{

    constructor(page){
            this.COP=new COP(page);
            this.DP= new DP(page);
            this.LP=new LP(page);
    }


    getLP(){
        return this.LP;
    }


    getCOP(){
        return this.COP;
    }


    getDP(){
        return this.DP;
    }


}


module.exports={POMManager}