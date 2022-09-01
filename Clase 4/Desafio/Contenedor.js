import fs from "fs";

export class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    getLastId(objects){
        return objects.length ? Math.max(...objects.map(object => {return object.id})) : 0;
    }

    async save(object){
        try{
            let objects = await this.getAll();
            let lastId = this.getLastId(objects);
            lastId += 1;
            objects = [...objects,{...object,id:lastId}];
            await fs.promises.writeFile(this.fileName,JSON.stringify(objects,null,2));
            return lastId;
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
            return objects;
        }catch(err){
            console.log(err);
        }
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