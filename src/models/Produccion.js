export default class Produccion {
    constructor({ nombre = '', gustos = [], ingredientes = [] } = {}) {
        this.nombre = nombre;
        this.gustos = Array.isArray(gustos) ? gustos : [];
        this.ingredientes = Array.isArray(ingredientes) ? ingredientes : [];
    }

    agregarNombre(nuevoNombre) {
        this.nombre = nuevoNombre;
        return this.nombre;
    }

    agregarGusto(nuevosGustos) {
        if (!Array.isArray(nuevosGustos)) {
            nuevosGustos = [nuevosGustos];
        }
        this.gustos.push(...nuevosGustos);
        return this.gustos;
    }

    agregarIngrediente(nuevosIngredientes) {
        if (!Array.isArray(nuevosIngredientes)) {
            nuevosIngredientes = [nuevosIngredientes];
        }
        this.ingredientes.push(...nuevosIngredientes);
        return this.ingredientes;
    }
}