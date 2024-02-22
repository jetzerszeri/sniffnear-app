import { CautionIcon, SuccessCheckOutlineIcon } from "./customIcons"


export const Modal = ( { children, heading, text, type='', icon= false}) => {
    return (
        <div className="modalBackground">
            <div className={`myModal ${ type }`}>
                {( icon && type === 'danger' ) && <CautionIcon />}
                {( icon && type === 'success' ) && <SuccessCheckOutlineIcon />}
                <div>
                    { heading && <p className='h'>{ heading }</p> }
                    <p>{ text }</p>
                </div>

                { 
                    children &&
                    <div className='actions'>
                        { children }
                    </div>
                }
            </div>
        </div>
    )
}
