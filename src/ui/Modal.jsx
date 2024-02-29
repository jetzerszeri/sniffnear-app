import { CautionIcon, ErrorXIcon, SuccessCheckOutlineIcon, WarningRedOutilineIcon } from "./customIcons"


export const Modal = ( { children, heading, text, type='', icon= false, custom = false}) => {
    return (
        <div className="modalBackground">

            {
                custom
                ? <div className='myModal custom'>
                        { children }
                </div>
                :<div className={`myModal ${ type }`}>
                    {( icon && type === 'danger' ) && <CautionIcon />}
                    {( icon && type === 'success' ) && <SuccessCheckOutlineIcon />}
                    { type && type === 'error' && <ErrorXIcon />}
                    { type && type === 'warning' && <WarningRedOutilineIcon />}

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
            }
            {/* <div className={`myModal ${ type }`}>
                {( icon && type === 'danger' ) && <CautionIcon />}
                {( icon && type === 'success' ) && <SuccessCheckOutlineIcon />}
                { type && type === 'error' && <ErrorXIcon />}
                { type && type === 'warning' && <WarningRedOutilineIcon />}

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
            </div> */}
        </div>
    )
}
