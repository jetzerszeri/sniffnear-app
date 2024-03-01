export const combineDateAndTime = (dateString, timeString) => {
    const combinedString = `${dateString.split('T')[0]}T${timeString}:00.000Z`;
    return new Date(combinedString);
}
