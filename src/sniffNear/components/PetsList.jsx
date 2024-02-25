import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../auth/context"
import { useFetchSniffNearApi } from "../../hooks";
import { PetsListItem } from "./PetsListItem";


export const PetsList = () => {

    const { user } = useContext( AuthContext );
    const { data, getData  } = useFetchSniffNearApi();

    const [ pets, setPets ] = useState([])

    

    

    useEffect(() => {
        getData(`users/${user.id}`);
    }, [ getData, user.id])
    
    useEffect(() => {

        if ( data ) {
            setPets(data.pets);
            // console.log(data);
        }

    }, [ data ])
    



    return (
    <>
        <ul className="petsList">

            {
                pets.map( pet => (
                    <PetsListItem 
                        key={ pet._id } 
                        pet={ pet }
                    />
                ))
            }

        </ul>
    </>
    )
}
