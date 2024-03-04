export const getCurrentTime = () => {
    const ahora = new Date();
    const hora = ahora.getHours().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const minutos = ahora.getMinutes().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    return `${hora}:${minutos}`;
}
