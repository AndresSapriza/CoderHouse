const options = require('../options/sqllite3');
const knex = require('knex');

const db = knex(options);

const createChatsTable = () => {
    db.schema.createTable('chats', table => {
        table.increments('id'),
        table.string('user',40),
        table.dateTime('date'),
        table.string('message',500)
    }).then(() => console.log('Table created'))
    .catch(err => console.log(err));
}

const initDB = async () => {
    let isChatsTableExist = await db.schema.hasTable('chats');
    if(!isChatsTableExist){
        createChatsTable();
    }
}

initDB();