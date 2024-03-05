export const orderData = (  objArray, prop, order = 'asc' ) => {
    if (!Array.isArray(objArray) || objArray.length <= 1) {
        return objArray;
    }

    const sortedArray = objArray.slice().sort((a, b) => {
        let comparison = 0;
        if (a[prop] > b[prop]) {
            comparison = 1;
        } else if (a[prop] < b[prop]) {
            comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
    });

    return sortedArray;
}
