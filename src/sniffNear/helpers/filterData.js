export const filterData = (data, filters, creatorPropertyName = 'creator', creatorId = null, excludeCreator = false) => {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      // Si la clave es igual al nombre de la propiedad del creador, aplicar el filtro correspondiente
      if (key === creatorPropertyName) {
        const creator = item[creatorPropertyName];
        if (!creatorId || !creator) return true; // Si no hay ID de creador o no hay creador, no aplicar filtro
        const creatorIdToCheck = creator._id || creator.id; // Intentar obtener el ID del creador del objeto anidado

        return excludeCreator ? creatorIdToCheck !== creatorId : creatorIdToCheck === creatorId;
      }
      // Si no es la clave del creador, aplicar los filtros normales
      // Si no hay filtro para esta clave, se asume que coincide
      if (filters[key] === '') return true;
      // Comprobar si el valor del filtro coincide con el valor del item
      return item[key] === filters[key];
    });
  });
};


