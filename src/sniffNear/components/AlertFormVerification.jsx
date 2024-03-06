import { AlertDetails } from './AlertDetails';

export const AlertFormVerification = ( { data, img, prevStep, onCreateAlert, alertType = "missing", user }) => {
    // console.log(data);
    return (
        <div>
            <h2>Verificá que los datos sean correctos</h2>

            {
                alertType === "missing" ?
                <p>Lamentamos mucho que <strong>{ data.petName }</strong> se haya extraviado, pero no será por mucho tiempo. Por favor verificá que la información esté correcta.</p>
                :
                <p>Muchas gracias por ayudarnos a que el regreso a casa sea una realidad. Por favor verificá que la información sea correcta.</p>
            }

            <AlertDetails alert={data} imgSelected={img} preview={true}/>



            {/* <h3>Mascota extraviada: { data.petName }</h3>
            <div className='alertFormCard'>
                <img src={img} alt="" />
                <ul>
                    <li>Tipo de animal: {data.type}</li>
                    {data.breed && <li>{data.breedType} - {data.breed}</li> }
                    <li>Color: {data.color1} {data.color2 && ` - ${data.color2}`}</li>
                    <li>Tamaño: {data.size}</li>
                    <li>Visto por última vez en: {data.city} el {data.date} al las {data.time} hrs.</li>
                </ul>
            </div> */}


            <div className="actions">
                <button className='btn secundary' type="buttton" onClick={ prevStep }>Regresar</button>
                {
                    user?.id
                    ? <button className='btn' type="buttton" onClick={()=> {onCreateAlert()}}>Publicar Alerta</button>
                    : <button className='btn' type="buttton" onClick={()=> {onCreateAlert()}}>Continuar</button>
                }
            </div>
        </div>
    )
}
