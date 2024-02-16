export const Loader = ( { label } ) => {

    return (
        <div className="loadingBackground">
            <div className="loadingContainer">
                <div className="bouncer">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                { 
                    label &&
                    <p>{ label }</p>
                }
            </div>
        </div>
    )
}
