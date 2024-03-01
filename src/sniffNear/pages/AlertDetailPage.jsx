import { useEffect, useState } from 'react';
import { useFetchSniffNearApi } from '../../hooks';
import { AlertDetails, NavBar } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../ui';

export const AlertDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ alert, setAlert ] = useState({});



    useEffect(() => {
        getData(`alerts/${id}`);
    }, [ getData, id ]);

    useEffect(() => {
        if ( data ) {
            setAlert(data);
            console.log(data);
        } else if ( error ) {
            // navigate(-1, { replace: true });
            console.log(error);
        }
    }, [ data, error, navigate ]);



    return (
    <>
        <NavBar title="Detalle de alerta" />

        {
            alert.alertType
            && <AlertDetails data={ alert } />
        }



        {
            isLoading && <Loader />
        }
    </>
    )
}
