const dataManager = require('./dataManager');
const productApi = require('./productManager');

class cartManager{
    constructor(){
        this.dataCart = new dataManager("cart.json");
    }

    async getById(id){
        let response = {};
        try{
            let cart = await this.dataCart.getById(id);
            if(cart){
                let products = cart.products;
                if(products.length){
                    response = {"OK":true, "message":"Success!", products:products};
                }
                response = {"OK":false, "message":`The cart is empty!`};
            } else {
                response = {"OK":false, "message":`Sorry, cart doesn't exist!`};
            }
        } catch(err) {
            console.log("this is error:"+err);
            response = {"OK":false, "message":"Oops, something happen"};
        }
        return response;
    }

    async add(){
        let response = {};
        try{
            let id = await this.dataCart.save({"products":[]});
            response = {"OK":true, "message":"Cart created!", id:id};
        }catch(err){
            console.log("this is error:"+err);
            response.OK = false;
            response.message = "Oops, something happen";
        }
        return response;        
    }

    async addProduct(id,productId){
        let response = {};
        console.log(productId);
        try{
            let cart = await this.dataCart.getById(id);
            if(cart){
                let product = await productApi.getById(productId);
                if (product){
                    cart.products = [...cart.products,product];
                    await this.dataCart.update(id,cart);
                    response = {"OK":true, "message":"Product added!"};
                } else { 
                    response = {"OK":false, "message":`Sorry, product doesn't exist!`};
                }
            } else {
                response = {"OK":false, "message":`Sorry, cart doesn't exist!`};
            }
        } catch(err) {
            console.log("this is error:"+err);
            response = {"OK":false, "message":"Oops, something happen"};
        }
        return response;
    }

    async delete(id){
        return await this.dataCart.deleteById(id);
    }

    async removeProduct(id,productId){
        let response = {};
        try{
            let cart = await this.dataCart.getById(id);
            if(cart){
                cart.products = cart.products.filter(prod => prod.id != productId);
                await this.dataCart.update(id,cart);
                response = {"OK":true, "message":"Product removed!"};
            } else {
                response = {"OK":false, "message":`Sorry, cart doesn't exist!`};
            }
        } catch(err) {
            console.log("this is error:"+err);
            response = {"OK":false, "message":"Oops, something happen"};
        }
        return response;
    }
}

const cartApi = new cartManager();
module.exports = cartApi;