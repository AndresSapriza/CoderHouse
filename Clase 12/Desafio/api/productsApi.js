class productsApi{
    constructor(){
        this.products = [];
        this.lastId = 0;
    }

    getAll(){
        return this.products;
    }

    getById(id){
        return this.products.find(product => product.id == id);
    }

    add(product){
        this.lastId += 1;
        this.products = [...this.products,{...product,id:this.lastId}]
        return this.lastId;
    }

    update(id,updProduct){
        this.products = this.products.map(prod => 
            prod.id == id ? {id, ...updProduct} : prod
        );
    }

    delete(id){
        this.products = this.products.filter(prod => prod.id != id);
    }
}

const products = new productsApi();
export default products;