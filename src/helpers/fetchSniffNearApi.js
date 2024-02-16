export const fetchSniffNearApi = async ( endpint, method, data, setState ) => {
    setState( { data: null, isLoading: true, error: null } );
    
    try {
        const response = await fetch(`https://sniffnear-api.onrender.com/api/${endpint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if (response.ok) {
            setState( { data: json, isLoading: false, error: null } );
            // return json;
        } else {
            // return { error: json.message };
            setState( { data: null, isLoading: false, error: json.message } );
        }
    } catch (e) {
        // return { error: e.message };
        setState( { data: null, isLoading: false, error: e.message } );
    }
}
