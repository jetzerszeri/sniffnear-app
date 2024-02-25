
export const getUserLocation = ( setCoords, setError) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lang: position.coords.longitude
                });
            },
            (error) => {
                setError(error.message);
            }
        );
    } else {
        setError('Ubicación no encontrada.');
    }
}
