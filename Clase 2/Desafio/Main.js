import { Usuario } from "./Usuario.js";

const main = () => {
    console.log("Creando usuario...");
    const usuario = new Usuario('Andres','Sapriza',[],['mascota1']);

    console.log(usuario);
    console.log("Add 'Que tupe' book");
    usuario.addBook('Que tupe','Diego Fischer');
    console.log(usuario);
    console.log("Add 'Harry potter' book");
    usuario.addBook('Harry potter','J.K Rowling');
    console.log(usuario);
    console.log("Add Mascota");
    usuario.addMascota('Mascota2');
    console.log(usuario);

    console.log("getFullName");
    console.log(usuario.getFullName());
    console.log("getBookNames");
    console.log(usuario.getBookNames());
    console.log("countMascotas");
    console.log(usuario.countMascotas());

    
}

main();