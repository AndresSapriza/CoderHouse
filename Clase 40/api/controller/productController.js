import ProductModel from "../../models/Schemas/productModel.js";

class ProductController {

    async get(req,res){
        try{
            const id = req.params.id;
            if(id){
                const product = await ProductModel.findById(id);
                if(!product) return res.status(404).json({message: `Product doesn't exist`});
                return res.status(200).json(product);
            }else{
                const products = await ProductModel.find();
                if(products.length == 0) return res.status(404).json({message: `Products are empty`});
                return res.status(200).json(products);
            }
        }catch(err){
            return res.status(500).json({message: `Something happen`});
        }
        
    }

    async add(req,res){
        const newProduct = await ProductModel.create(req.body)
        return res.status(200).json(newProduct);
        
    }

    async update(req,res){
        try{
            const id = req.params.id;
            await ProductModel.findByIdAndUpdate(id,req.body);
            return res.status(200).json({message: `Product updated`});
        } catch(err) {
            return res.status(404).json({message: `Product couldn't be updated`});
        }
    }

    async delete(req,res){
        try{
            const id = req.params.id;
           await ProductModel.findByIdAndDelete(id);
           return res.status(200).json({message: `Product deleted`});
        } catch(err) {
            return res.status(404).json({message:`Product couldn't be deleted`});
        }
    }
}

export default new ProductController();