import React from 'react'
import { calculateAge } from '../../helpers';

export const UserCard = ( { user, createdAt, children} ) => {
    const { name, profileImg } = user;

    return (
        <div className="userCard">
            <img src={ 
                    ( !!profileImg ) 
                    ? profileImg : 
                    '/img/avatarPorDefecto.webp'    
            } alt="Avatar del usuario"/>

            <div>

                <div>
                    <p className='name'>{name}</p>
                    <p>Publicado hace {calculateAge(createdAt)}</p>
                </div>

                {
                    children &&
                    <div className='btns'>
                        { children }
                    </div>
                }

            </div>

        </div>
    )
}
