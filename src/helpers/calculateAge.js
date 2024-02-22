export const calculateAge = ( isoDate ) => {
    const birthDate = new Date(isoDate);
    const currentDate = new Date();

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInMilliseconds = currentDate - birthDate;
    const days = Math.floor(differenceInMilliseconds / millisecondsInDay);

    if (days < 30) {
        return `${days} días`;
    }

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    // Si el mes actual es menor que el mes de nacimiento, disminuye un año y suma 12 a los meses
    if (months < 0) {
        years--;
        months += 12;
    }

    // Si estamos en el mismo mes pero el día actual es menor que el día de nacimiento, disminuye un mes
    if (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
        months--;
    }

    let texto = `${years} años`;
    switch (years) {
        case 0:
            if (months === 1) {
                texto = ' 1 mes';
            } else if (months !== 1) {
                texto = `${months} meses`;
            }
            break;
        case 1:
            if (months === 0) {
                texto = `${years} año`;
            } else {
                if (months === 1) {
                    texto = `${years} año y ${months} mes`;
                } else {
                    texto = `${years} año y ${months} meses`;
                }
            }
            break;
        default:
            if (months === 0) {
                texto = `${years} años`;
            } else if (months === 1) {
                texto = `${years} años y ${months} mes`;
            } else {
                texto = `${years} años y ${months} meses`;
            }
            break;
    }

    return texto;
}
