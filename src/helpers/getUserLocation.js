export const getUserLocation = (setCoords, setError) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Permiso denegado para obtener la ubicación.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError("La información de ubicación no está disponible.");
                        break;
                    case error.TIMEOUT:
                        setError("La petición para obtener la ubicación ha excedido el tiempo de espera.");
                        break;
                    default:
                        setError("Ha ocurrido un error desconocido al obtener la ubicación.");
                }
            }
        );
    } else {
        setError('La geolocalización no es soportada por este navegador.');
    }
}
