

export const Modal = ( { children, heading, text, type=''}) => {
    return (
        <div className="modalBackground">
            <div className={`myModal ${ type }`}>
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
