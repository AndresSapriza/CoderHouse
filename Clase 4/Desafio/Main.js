import { Contenedor } from "./Contenedor.js";
import fs from "fs";

const main = async () => {
    const contenedor = new Contenedor('producto.txt');
    try{
        let id = await contenedor.save({});
        console.log(id);

        let objects = await contenedor.getAll();
        console.log(objects);

        let object = await contenedor.getById(3);
        console.log(object);
        await contenedor.deleteById(3);
        object = await contenedor.getById(3);
        console.log(object);

        id = await contenedor.save({});
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