import { useState } from "react";
import { FormBirthDate, FormName, FormPersonalData } from "./components";
import { CardFormLayout } from "./layout/CardFormLayout";

export const ChatApp = () => {

    const [user, setUser] = useState({
        name: '',
        secondName: '',
        firstLastName: '',
        secondLastName: '',
        birthDate: '',
        email: '',
        phone: ''
    });

    const [numStep, setNumStep] = useState(1);
    const [errorsStep1, setErrorsStep1] = useState(null);
    const [errorsStep2, setErrorsStep2] = useState(null);
    const [errorsStep3, setErrorsStep3] = useState(null);
    const [newUser, setNewUser] = useState(false);
    const [errorCreateUser, setErrorCreateUser] = useState({
        status: true,
        message: ''
    });

    //save user in DB and session storage
    const onClicCreateUser = async (e) => {

        console.log('onClicCreateUser');
        console.log(user);
        try {

            const response = await fetch("https://shyjdw3soc.execute-api.us-east-1.amazonaws.com/test/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const responseJSON = await response.json();
            console.log(responseJSON);

            if (responseJSON.status) {
                setErrorCreateUser({ status: true, message: '' })
                const { user: userCreated } = responseJSON;
                setUser({ ...userCreated });
                setNumStep(5);
                setNewUser(true);
                //save session storage
                const keys = Object.keys(userCreated);
                keys.forEach(element => sessionStorage.setItem(element, user[element]));
            } else {
                setErrorCreateUser({ status: false, message: responseJSON.message })
                console.error('Ocurrió un error al guardar la información');
            }
        } catch (error) {
            setNumStep(4);
            console.error(error);
            setErrorCreateUser({ status: false, message: 'Ocurrió un error al guardar la información.' });
        }

    }



    return (
        <div className="container mt-5">
            <h1>ChatForm</h1>
            <hr />
            <FormName
                user={user}
                setUser={setUser}
                numStep={numStep}
                setNumStep={setNumStep}
                setErrors={setErrorsStep1}
            />
            {
                (numStep > 1) ?
                    <FormBirthDate
                        user={user}
                        setUser={setUser}
                        numStep={numStep}
                        setNumStep={setNumStep}
                        setErrors={setErrorsStep2}
                    />
                    : ''
            }
            {
                (numStep > 2) ?
                    <FormPersonalData
                        user={user}
                        setUser={setUser}
                        numStep={numStep}
                        setNumStep={setNumStep}
                        setErrors={setErrorsStep3}
                    />
                    : ''
            }
            {
                (numStep > 3) ?
                    <>
                        <CardFormLayout>
                            <div className="card-body">Si tus datos son correctos por favor continuemos</div>
                        </CardFormLayout>

                        <div className="row mb-2 mt-2">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <div className="d-grid">
                                    <button onClick={onClicCreateUser} className="btn btn-primary btn-block" disabled={(errorsStep1 || errorsStep2 || errorsStep3 || newUser)} style={{ "backgroundColor": "DeepPink" }}>
                                        Iniciar
                                    </button>
                                    
                                    {!errorCreateUser.status && <h6 className='text-danger d-block mt-3'>{errorCreateUser.message}</h6>}
                                   {/*  {
                                        !errorCreateUser.status ?
                                            <div className="alert alert-danger mt-2">
                                                <strong>Error: </strong> {errorCreateUser.message}
                                            </div>
                                            : ''
                                    } */}
                                </div>
                            </div>
                        </div>
                    </>
                    : ''
            }
            {
                (numStep === 5) ?
                    <div className="row mt-2 mb-2">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="card" style={{ "backgroundColor": "Violet" }}>
                                <div className="card-body">
                                    <p className="card-text">
                                        <strong>Los datos se almacenaron correctamente: </strong> <br></br>
                                        Fecha de nacimiento: {user.birthDate} <br></br>
                                        Correo electrónico: {user.email} <br></br>
                                        Teléfono celular: {user.phone} <br></br>
                                        Nombre: {user.name} {user.secondName} {user.firstLastName} {user.secondLastName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    : ''
            }


        </div>
    )
}

