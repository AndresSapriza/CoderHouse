const dataManager = require('./dataManager');

class productManager{
    constructor(){
        this.dataProducts = new dataManager("products.json");
    }

    async get(id){
        try{
            if (id) return await this.dataProducts.getById(id);
            
            return await this.dataProducts.getAll();            
        } catch(err) {
            console.log(err);
        }
    }

    async add(product){
        let response = this.isValid(product);
        if (response.OK){
            try{
                let id = await this.dataProducts.save(product);
                response = {...response, id:id};
            }catch(err){
                console.log("this is error:"+err);
                response.OK = false;
                response.message = "Oops, something happen";
            }
        }
        return response;
        
    }

    async update(id,updProduct){
        let response = {};
        try{
            let product = await this.dataProducts.getById(id);
            if(product){
                response = this.isValid(updProduct);
                if (response.OK){
                    await this.dataProducts.update(id,updProduct);
                }
            } else {
                response.OK = false;
                response.message = `Sorry, product doesn't exist!`;
            }
        } catch(err) {
            console.log("this is error:"+err);
            response.OK = false;
            response.message = `Oops, something happen!`;
        }
        return response;
    }

    async delete(id){
        return await this.dataProducts.deleteById(id);
    }

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