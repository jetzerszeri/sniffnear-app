import React, { useContext } from 'react'
import { NavBar } from '../components'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../auth/context'

export const AccountPage = () => {

    const { user } = useContext( AuthContext );
    const { name, email, profileImg } = user;

    const avatar = profileImg ? profileImg : "/img/avatarPorDefecto.webp";

    return (
    <>
        <NavBar title='Mi perfil' />

        <main className='accountView'>
            <section>
                <img src={ avatar } alt="avatar" />
                <div>
                    <h1>{ name }</h1>
                    <p>{ email }</p>
                    <Link to="/account/edit" className="btn secundary small">Editar perfil</Link>
                </div>
            </section>

        </main>
    </>
    )
}
