import db from '../db/fireBase.js'

class CartControllerFireBase {

    async get(req,res){
        try{
            const cartsCollection = db.collection('carts');
            const id = req.params.id;
            const cart = await (await cartsCollection.doc(id).get()).data();
            if(!cart) return res.status(404).json({message: `Cart doesn't exist`});
            return res.status(200).json(cart.products);
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }

    async add(req,res){
        const cart = {timeStamp:Date.now(),products:[]};
        const cartsCollection = db.collection('carts');
        const newCart = await cartsCollection.add(cart)
        return res.status(200).json(newCart);
    }

    async addProduct(req,res){
        try{
            const cartsCollection = db.collection('carts');
            const id = req.params.id;
            const cart = await (await cartsCollection.doc(id).get()).data();
            if(!cart) return res.status(404).json({message: `Cart doesn't exist`});
            cart.products.push(req.body);
            await cartsCollection.doc(id).update(cart);
            return res.status(200).json({message: `Product added`});
        } catch(err) {
            return res.status(404).json({message: `Product couldn't be added`});
        }
    }

    async delete(req,res){
        try{
            const cartsCollection = db.collection('carts');
            const id = req.params.id;
            await cartsCollection.doc(id).delete();
            return res.status(200).json({message: `Cart deleted`});
        } catch(err) {
            return res.status(404).json({message:`Cart couldn't be deleted`});
        }
    }

    async removeProduct(req,res){
        try{
            const cartsCollection = db.collection('carts');
            const id = req.params.id;
            const productId = req.params.id_prod;
            const cart = await (await cartsCollection.doc(id).get()).data();
            if(cart){
                cart.products = cart.products.filter(prod => prod.id != productId);
                await cartsCollection.doc(id).update(cart);
                return res.status(200).json({message: `Product removed`});
            } else {
                return res.status(404).json({message:`Cart doesn't exist`});
            }
        } catch(err) {
            return res.status(404).json({message: `Product couldn't be removed`});
        }
    }
}

export default new CartControllerFireBase();