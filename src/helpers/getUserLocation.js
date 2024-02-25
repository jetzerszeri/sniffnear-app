
export const getUserLocation = ( setCoords, setError) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
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
