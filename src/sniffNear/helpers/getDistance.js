import { deg2rad } from './deg2rad';

export const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km

    if (distance < 1) {
        const distanceInMeters = Math.round(distance * 1000);
        if (distanceInMeters <= 1){
            return `menos de 1 metro`;
        } else {
            return `${distanceInMeters} metros`;
        }
    } else if (distance >= 1 && distance < 10) {
        return `${distance.toFixed(2)} km`;
    } else {
        return `${Math.round(distance)} km`;
    }
}
