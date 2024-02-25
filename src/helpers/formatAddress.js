import {
    setDefaults,
    geocode,
    RequestType,
} from 'react-geocode';

setDefaults({
    key: 'AIzaSyASo039W_jF7D14theWAy0KkQt0ky7RSUY',
    language:"es",
    region: "es"
});


export const formatAddress = ( lat, lng, setter ) => {

    geocode(RequestType.LATLNG, `${lat},${lng}`, {
        location_type: "ROOFTOP", // Override location type filter for this request.
        enable_address_descriptor: true, // Include address descriptor in response.
    })
    .then(({ results }) => {
        const address = results[0].formatted_address;
        // console.log(results[0].address_components);
        const { city, state, country } = results[0].address_components.reduce(
        (acc, component) => {
            if (component.types.includes("locality"))
            acc.city = component.long_name;
            else if (component.types.includes("administrative_area_level_1"))
            acc.state = component.long_name;
            else if (component.types.includes("country"))
            acc.country = component.short_name;
            return acc;
        },
        {}
        );

        // console.log(city, state, country);
        // console.log(address);
        setter({ city, state, country, full: address });
    })
    .catch( error => {
        setter({ error: 'Ubicación no encontrada'})
    });
}

