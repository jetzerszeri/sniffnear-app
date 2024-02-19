import { NavBar, PetsList } from "../components"


export const PetsPage = () => {


    return (
        <>
        <NavBar title='Mis mascotas' />
        
        <main>

            <section>
                <PetsList />
            </section>

        </main>
        </>
    )
}
