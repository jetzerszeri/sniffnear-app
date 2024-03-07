import React from 'react';
import { Link } from 'react-router-dom';

export const NoResultsFound = ( { type = "chat" } ) => {


    return (
        <div className="noResultsFound">
            <div>
                <h2>No se encontraron resultados</h2>

                {
                    type === "chat" 
                    && <p>Si necesitás contactar a alguien sobre una mascota que encontraste, por favor ve a la sección de <Link to={'/alerts'} className='link'>alertas</Link> e iniciá la conversación desde el detalle de dicha alerta.</p>
                }

                {
                    type === "alerts" 
                    && <p>Si necesitás crear una alerta, por favor <Link to={'/alerts/new'} className='link'>hacelo desde aquí</Link> para que otros puedan ayudarte a recuperar tu mascota.</p>
                }

                {
                    type === "posts"
                    && <p>Si necesitás crear una publicación, por favor <Link to={'/blog/new'} className='link'>hacelo desde aquí</Link>.</p>
                }

            </div>

        </div>
    )
}
