const knex = require('knex');

class dbApi{
    constructor(options, table){
        this.options = options;
        this.table = table;
        this.db = knex(this.options);
    }

    async getAll(){
        let products = await this.db.from(this.table).select('*');
        return products;
    }

    getById(id){
        this.db(this.table).select('*').where('id','=',id)
        .then((rows) => console.log(rows))
        .catch(err => console.log(err))
        .finally(() => {
            this.db.destroy();
        });
    }

    async add(product){
        await this.db(this.table).insert(product);
    }

    update(id,updProduct){
        this.db(this.table).where('id','=',id).update(updProduct)
        .then((result) => console.log(result))
        .catch(err => console.log(err))
        .finally(() => {
            this.db.destroy();
        });
    }

    delete(id){
        this.db(this.table).where('id','=',id).del()
        .then((result) => console.log(result))
        .catch(err => console.log(err))
        .finally(() => {
            this.db.destroy();
        });
    }
}


module.exports = dbApi;