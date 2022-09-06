import { Contenedor } from "./Contenedor.js";
import fs from "fs";

const main = async () => {
    const initContenedor = new Contenedor('initProductos.txt')
    const contenedor = new Contenedor('producto.txt');
    
    let initObjects;
    let objects;
    let object;
    let id;
    try{
        initObjects = await initContenedor.getAll();
        console.log(initObjects);
        
        for (const obj of initObjects){
            console.log(obj);
            id = await contenedor.save(obj);
            console.log(id);
        }

        objects = await contenedor.getAll();
        console.log(objects);

        object = await contenedor.getById(3);
        console.log(object);
        await contenedor.deleteById(3);
        object = await contenedor.getById(3);
        console.log(object);

        id = await contenedor.save({
            "title": "Goma",
            "price": 48.45,
            "thumbnail": "thumbnail_1"
          });
        console.log(id);
        objects = await contenedor.getAll();
        console.log(objects);

        await contenedor.deleteAll();
        objects = await contenedor.getAll();
        console.log(objects);
    }catch(err){
        console.log("this is error:"+err);
    }

}

main();