import { NavBar } from '../components/NavBar';
import { useMultiSteps } from '../hooks';
import { MultiStepsIndicator } from '../../ui/MultiStepsIndicator';
import { CatIcon, DogIcon } from '../../ui/customIcons';
import { PetTypeInput } from '../../ui/customInputs';
import { useForm } from '../../hooks/useForm';

export const PetsAddPage = () => {

    const { currentStep, totalSteps, nextStep, prevStep} = useMultiSteps(3);

    const { type, name, birthdate, breed, setErrors, setCheckErrors, onInputChange, setManualValue } = useForm({
        type: '',
        name: '',
        birthdate: '',
        breed: ''
    })


    return (
        <>
            <NavBar title='Agregar mascota' />
            <main className='fullHeight'>

                <MultiStepsIndicator total={totalSteps} current={currentStep} />

                <form className='multiSteps'>

                    <div className='step'>
                        <h2>¿Qué tipo de mascota es?</h2>
                        <PetTypeInput 
                            changeFunction={ setManualValue }
                            typeValue={ type }
                        />

                    </div>


                    <div className='actions'>
                        <button className='btn secundary'>
                            Cancelar
                        </button>

                        <button className='btn'>
                            Siguiente
                        </button>
                    </div>


                </form>


            </main>
        </>
    )
}
