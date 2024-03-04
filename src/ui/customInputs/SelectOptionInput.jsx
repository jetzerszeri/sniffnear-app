import React from 'react'

export const SelectOptionInput = ( { name, value, onChangeFunction, label, errors, required = false, setErrors, checkErrors, options = {} } ) => {

    let error = errors ? errors[name] : null;



    return (
    <div className="inputContainer">
            <label htmlFor={ name }>{label}</label>
            <select 
                name={ name }
                value={ value }
                onChange={ onChangeFunction }
                className={ error ? 'error' : '' }
            >
                <option value="" disabled defaultValue>Seleccioná una opción</option>

                {
                    Object.keys(options).map( key => {
                        return <option key={ key } value={ key }>{ options[key] }</option>
                    })
                }


                {/* <option value="raza">Mi mascota es de raza</option>
                <option value="callejero">Mi mascota es callejera</option>
                <option value="desconocido">No sé la raza de mi mascota</option> */}
            </select>
            {error && <p className='errorInput'>{ error }</p>}
    </div>
    )
}
