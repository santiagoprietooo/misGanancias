export default function formatearPrecio(monto) {
    const formato = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    });

    return formato.format(monto);
}