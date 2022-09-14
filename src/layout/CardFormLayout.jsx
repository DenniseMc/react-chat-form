export const CardFormLayout = ({ children }) => {
    return (
        <div className="row mt-2 mb-2">
            <div className="col-2">
                <img src="./assets/woman.jpg" className="rounded-circle float-end img-responsive" width="50%" alt="foto" />
            </div>
            <div className="col-6">
                <div className="card bg-light">
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
            <div className="col-4"></div>
        </div>
    )
}
