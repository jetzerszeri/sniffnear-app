export const combineDateAndTime = (dateString, timeString) => {
    const combinedString = `${dateString.split('T')[0]}T${timeString}:00.000`;
    // console.log(new Date(combinedString));
    return new Date(combinedString);
}
