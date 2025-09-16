export default function formatoHora(f) {
    if (!f) return null;

    const fecha = new Date(f);

    const formatoDia = new Intl.DateTimeFormat('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const formatoHora = new Intl.DateTimeFormat('es-AR', {
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });

    return `${formatoDia.format(fecha).replace(',', '')} - ${formatoHora.format(fecha).replace(',', '')}`;
}