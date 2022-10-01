const options = require('../options/mariaDB');
const knex = require('knex');

const db = knex(options);

const createProductsTable = () => {
    db.schema.createTable('products', table => {
        table.increments('id'),
        table.string('title',20),
        table.integer('price'),
        table.string('thumbnail',500)
    }).then(() => console.log('Table created'))
    .catch(err => console.log(err));
}

const insertProducts = () => {
    const products = [
        {
          title: "Escuadra",
          price: 213.45,
          thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/330px-Squadra_45.jpg"
        },
        {
          title: "taza",
          price: 98.45,
          thumbnail: "https://shop.bestsublimation24.eu/spa_pm_Taza-magica-A-330-ml-sublimacion-verde-transferencia-termica-40_1.jpg"
        }
      ]
    
    db('products').insert(products)
        .then((result) => console.log(result))
        .catch(err => console.log(err))
        .finally(() => db.destroy());
}

const initDB = async () => {
    let isProductsTableExist = await db.schema.hasTable('products');
    if(!isProductsTableExist){
        createProductsTable();
        insertProducts();
    }
}

initDB();