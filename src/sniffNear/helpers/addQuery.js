import queryString from 'query-string';

export const addQuery = (path, newParams) => {
        // Obtener los query strings actuales de la URL
    const currentQueryString = window.location.search;
    // Parsear los query strings actuales a un objeto
    const parsedQueryString = queryString.parse(currentQueryString);
    // Agregar nuevos query strings al objeto
    const mergedParams = { ...parsedQueryString, ...newParams };
    // Convertir el objeto con los nuevos query strings de nuevo a una cadena de query string
    const newQueryString = queryString.stringify(mergedParams);
    // Construir la nueva URL con los query strings agregados
    return `${path}?${newQueryString}`;
}
