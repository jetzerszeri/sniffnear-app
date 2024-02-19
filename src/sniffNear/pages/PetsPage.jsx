import { NavBar, PetsList } from "../components"


export const PetsPage = () => {


    return (
        <>
        <NavBar title='Mis mascotas' />
        
        <main>
            <h1>Lista de mascotas</h1>

            <section>
                <PetsList />
            </section>

        </main>
        </>
    )
}
