export const updateDocument = async ( collection, id, data ) => {
    try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/${collection}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (response.ok) {
            return json;
        } else {
            return { error: json.message };
        }
    } catch (e) {
        return { error: e.message };
    }
}