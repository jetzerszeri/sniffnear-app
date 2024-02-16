import { fetchSniffNearApi } from "../../helpers"

export const updateDocument = async ( collection, id, data ) => {

    const fetchResponse = await fetchSniffNearApi(`${collection}/${id}`, 'PUT', data);

    return fetchResponse;
}