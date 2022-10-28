import db from '../db/fireBase.js'

class ProductControllerFireBase {

    async get(req,res){
        try{
            const productsCollection = db.collection('products');
            const id = req.params.id;
            if(id){
                const productDoc = await productsCollection.doc(id);
                const product = (await productDoc.get()).data();
                if(!product) return res.status(404).json({message: `Product doesn't exist`});
                return res.status(200).json(product);
            }else{
                const productDocs = await productsCollection.get();
                const products = productDocs.docs.map(doc => doc.data());
                if(products.length == 0) return res.status(404).json({message: `Products are empty`});
                return res.status(200).json(products);
            }
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }

    async add(req,res){
        const productsCollection = db.collection('products');
        const newProduct = await productsCollection.add(req.body)
        return res.status(200).json(newProduct);
        
    }

    async update(req,res){
        try{
            const productsCollection = db.collection('products');
            const id = req.params.id;
            await productsCollection.doc(id).update(req.body);
            return res.status(200).json({message: `Product updated`});
        } catch(err) {
            console.debug(err);
            return res.status(404).json({message: `Product couldn't be updated`});
        }
    }

    async delete(req,res){
        try{
            const productsCollection = db.collection('products');
            const id = req.params.id;
            await productsCollection.doc(id).delete();
            return res.status(200).json({message: `Product deleted`});
        } catch(err) {
            return res.status(404).json({message:`Product couldn't be deleted`});
        }
    }
}

export default new ProductControllerFireBase();