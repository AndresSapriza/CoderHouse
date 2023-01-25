import CartModel from "../models/cartModel.js";
import { shoppingMail } from '../comunication/sendMail.js'
import { shoppingSMS, shoppingWPP } from '../comunication/sendSMS.js'

class CartController {

    async get(req,res){
        try{
            const id = req.params.id;
            const cart = await CartModel.findById(id);
            if(!cart) return res.status(404).json({message: `Cart doesn't exist`});
            return res.status(200).json(cart.products);
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }

    async add(req,res){
        const newCart = await CartModel.create(req.body)
        return res.status(200).json(newCart);
    }

    async addProduct(req,res){
        try{
            const id = req.params.id;
            const cart = await CartModel.findById(id);
            if(!cart) return res.status(404).json({message: `Cart doesn't exist`});
            cart.products.push(req.body);
            await CartModel.findByIdAndUpdate(id,cart);
            return res.status(200).json({message: `Product added`});
        } catch(err) {
            return res.status(404).json({message: `Product couldn't be added`});
        }
    }

    async delete(req,res){
        try{
            const id = req.params.id;
            await CartModel.findByIdAndDelete(id);
            return res.status(200).json({message: `Cart deleted`});
        } catch(err) {
            return res.status(404).json({message:`Cart couldn't be deleted`});
        }
    }

    async removeProduct(req,res){
        try{
            const id = req.params.id;
            const productId = req.params.id_prod;
            const cart = await CartModel.findById(id);
            if(cart){
                cart.products = cart.products.filter(prod => prod != productId);
                await CartModel.findByIdAndUpdate(id,cart);
                return res.status(200).json({message: `Product removed`});
            } else {
                return res.status(404).json({message:`Cart doesn't exist`});
            }
        } catch(err) {
            return res.status(404).json({message: `Product couldn't be removed`});
        }
    }

    async sendShopping(req,res){
        const id = req.params.id;
        const cart = await CartModel.findById(id);
        const products = cart.products;
        console.log(JSON.stringify(req.user));
        await shoppingMail(products,req.user.name);
        await shoppingSMS(req.user.phone);
        await shoppingWPP(req.user.name);
        return res.status(200).json({message: `Shopping succeed!`});
    }
}

export default new CartController();