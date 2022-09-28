const dataManager = require('./dataManager');

class productManager{
    constructor(){
        this.dataProducts = new dataManager("products.json");
    }

    async getById(id){
        return await this.dataProducts.getById(id);
    }

    async add(product){
        let response = this.isValid(product);
        if (response.OK){
            try{
                let id = await this.dataProducts.save(product);
                response = {...response, id:id};
                return response;
            }catch(err){
                console.log("this is error:"+err);
                response.OK = false;
                response.message = "Oops, something happen";
            }
        }
        return response;
        
    }

    // update(id,updProduct){
    // }

    // delete(id){
    // }

    isValid(product){
        if(!product.name) return {"OK":false, "message":"name is required!"};
        if(!product.description) return {"OK":false, "message":"description is required!"};
        if(!product.code) return {"OK":false, "message":"code is required!"};
        if(!product.photo ) return {"OK":false, "message":"photo  is required!"};
        if(!product.price) return {"OK":false, "message":"price is required!"};
        if(!product.stock) return {"OK":false, "message":"stock is required!"};

        return {"OK":true, "message":"Success!"};
    }
}

const productApi = new productManager();
module.exports = productApi;