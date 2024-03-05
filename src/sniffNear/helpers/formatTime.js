export const formatTime = (createdAt, index, msgHistory) => {
    const date = new Date(createdAt);
    const options = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    const timeString = date.toLocaleTimeString('es-ES', options);
  
    if (index === 0 || new Date(msgHistory[index - 1].createdAt).getDate() !== date.getDate()) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      };
      const dateString = date.toLocaleDateString('es-ES', options);
      return `${dateString} ${timeString}`;
    }
  
    return timeString;
  };
  