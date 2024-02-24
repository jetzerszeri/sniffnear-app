

export const convertDate = ( initialDate ) => {
    const date = new Date(initialDate);

    const año = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0'); 

    return `${año}-${mes}-${dia}`;
}
