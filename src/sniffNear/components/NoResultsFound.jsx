import React from 'react';
import { Link } from 'react-router-dom';

export const NoResultsFound = ( { type = "chat"} ) => {


    return (
        <div className="noResultsFound">
            <div>
                <h2>No se encontraron resultados</h2>

                {
                    type === "chat" 
                    && <p>Si necesitás contactar a alguien sobre una mascota que encontraste, por favor ve a la sección de <Link to={'/alerts'} className='link'>alertas</Link> e iniciá la conversación desde el detalle de dicha alerta.</p>
                }

            </div>

        </div>
    )
}
