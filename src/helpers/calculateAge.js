export const calculateAge = ( isoDate, displayHrs = true ) => {
    const birthDate = new Date(isoDate);
    const currentDate = new Date();

    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    const differenceInMilliseconds = currentDate - birthDate;
    const days = Math.floor(differenceInMilliseconds / millisecondsInDay);
    const hours = Math.floor((differenceInMilliseconds % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((differenceInMilliseconds % millisecondsInHour) / millisecondsInMinute);

    if (days < 30) {
        if ( displayHrs ){
            if (days === 0 && hours === 0 && minutes <= 1) {
                return '1 minuto';
            } else if (days === 0 && hours === 0) {
                return `${minutes} minutos`;
            } else if (days === 0 && hours === 1) {
                return '1 hora';
            } else if (days === 0) {
                return `${hours} horas`;
            } else {
                return (
                    days === 1
                    ? '1 día'
                    : `${days} días`
                );
            }
        } else {
            return (
                days <= 1
                ? '1 día'
                : `${days} días`
            );
        }
    }

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

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
