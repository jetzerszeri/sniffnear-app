import { AlertCard } from './AlertCard';
import { NoResultsFound } from './NoResultsFound';

export const AlertCardList = ( { list } ) => {

    return (
    <>
        {

            list.length > 0 
            ?<ul className='alertList'>
                {
                    list.map( alert => (
                        <AlertCard
                            key={ alert._id }
                            data={ alert }
                        />
                    ))
                }
            </ul>
            : <NoResultsFound type="alerts"/>
            
        }
        
    </>
    )
}
