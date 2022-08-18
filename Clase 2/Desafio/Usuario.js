export class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.apellido} ${this.nombre}`;
    }

    addMascota(mascota){
        this.mascotas = [...this.mascotas,mascota];
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre,autor){
        this.libros = [...this.libros,{nombre:nombre, autor:autor}];
    }

    getBookNames(){
        return this.libros.map((element) => {return element.nombre;});
    }
}