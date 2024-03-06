
export const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  return date.toLocaleDateString('es-ES', options);
};

export const formatTime = (createdAt) => {

  const hour = createdAt.slice(11, 13);
  const minute = createdAt.slice(14, 16); 

  return `${hour}:${minute}`;
};
