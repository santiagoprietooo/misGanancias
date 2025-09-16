export default class Ganancias {
    constructor(total) {
        this.total = total;
    }

    obtenerTotal() {
        return this.total;
    }

    aumentarMonto(monto) {
        this.total += monto;
        return this.total;
    }

    restarMonto(monto) {
        this.total -= monto;
        return this.total;
    }
}