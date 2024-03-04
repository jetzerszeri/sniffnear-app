export const filterData = (data, filters) => {
    return data.filter(item => {
      return Object.keys(filters).every(key => {
        // Si no hay filtro para esta clave, se asume que coincide
        if (filters[key] === '') return true;
        // Comprobar si el valor del filtro coincide con el valor del item
        return item[key] === filters[key];
      });
    });
  };