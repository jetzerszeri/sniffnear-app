import { useNavigate } from "react-router-dom";


export const PetsListItem = ( { pet, forAlert }) => {
    const { name, type, _id } = pet;

    const navigate = useNavigate();
    let img;
    !pet.img ? img = `/img/${type}-icon.svg` : img = pet.img;

    const onClick = () => {
        if ( forAlert ) {
            navigate(`?type=missing&petId=${_id}`);
        } else {
            navigate(`/pets/${_id}`);
        }
        // navigate(`/pets/${_id}`);
    }

    return (
        <li onClick={ onClick }>
            <div>
                <img src={ img } alt={ type } />
            </div>
            <p>{ name }</p>
            { !forAlert && <i className="bi bi-chevron-right"></i> }
        </li>
    )
}
