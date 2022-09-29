const fs = require("fs");

module.exports = class DataManager{
    constructor(fileName){
        this.fileName = `models/${fileName}`;
    }

    getLastId(objects){
        return objects.length ? Math.max(...objects.map(object => {return object.id})) : 0;
    }

    async save(object){
        try{
            let objects = await this.getAll();
            let lastId = this.getLastId(objects);
            lastId += 1;
            objects = [...objects,{id:lastId,timeStamp:Date.now(),...object}];
            await fs.promises.writeFile(this.fileName,JSON.stringify(objects,null,2));
            return lastId;
        }catch(err){
            console.log(err);
        }
    }

    async update(id,updObject){
        try{
            let objects = await this.getAll();
            objects = objects.map(obj => 
                obj.id == id ? {id, ...updObject} : obj
            );
            await fs.promises.writeFile(this.fileName,JSON.stringify(objects,null,2));
        }catch(err){
            console.log(err);
        }
    }

    async getById(id){
        try{
            let objects = await this.getAll();
            let object = objects.find(obj => obj.id == id);
            return object;
        }catch(err){
            console.log(err);
        }
    }

    async getAll(){
        let objects = [];
        try{
            if(fs.existsSync(this.fileName)){
                let contents = await fs.promises.readFile(this.fileName,'utf-8');
                objects = JSON.parse(contents);
            }
        }catch(err){
            console.log(err);
        }
        return objects;
    }

    async deleteById(id){
        try{
            let objects = await this.getAll();
            objects = objects.filter(obj => obj.id != id);
            await fs.promises.writeFile(this.fileName,JSON.stringify(objects,null,2));
        }catch(err){
            console.log(err);
        }
    }

    async deleteAll(){
        try{
            let objects = [];
            await fs.promises.writeFile(this.fileName,JSON.stringify(objects,null,2));
        }catch(err){
            console.log(err);
        }
    }
}