import { PetTypeInput } from '../../ui/customInputs';


export const PetFormPart1 = ( { setManualValue, type, onNext, bySteps = false} ) => {
    return (
        <div className={ bySteps ? 'step' : '' }>
            { bySteps && <h2>¿Qué tipo de mascota es?</h2> }
            <PetTypeInput
                changeFunction={ setManualValue }
                typeValue={ type }
                onClickFunction={ onNext }
            />
        </div>
    )
}
