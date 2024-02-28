import { AlertCard } from './AlertCard';

export const AlertCardList = ( { list } ) => {

    return (
        <ul className='alertList'>

            {
                list.map( alert => (
                    <AlertCard
                        key={ alert._id }
                        data={ alert }
                    />
                ))
            }

        </ul>
    )
}
