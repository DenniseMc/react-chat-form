export const CardAnswerLayout = ({ children }) => {
    return (
        <div className="row mt-2">
            <div className="col-6"></div>
            <div className="col-6">
                <div className="card" style={{ "backgroundColor": "Violet" }}>
                    <div className="card-body">
                        <p className="card-text">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
