

export const PetsListItem = ( { pet }) => {
    const { name, type, _id } = pet;

    // if ( !pet.img ) img = `/img/${type}-icon.svg` ;
    let img;
    !pet.img ? img = `/img/${type}-icon.svg` : img = pet.img;

    return (
        <li>
            <div>
                <img src={ img } alt={ type } />
            </div>
            <p>{ name }</p>
            <i className="bi bi-chevron-right"></i>
        </li>
    )
}
