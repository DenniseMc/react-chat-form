import { useState } from "react"
import { useForm } from 'react-hook-form'
import { CardAnswerLayout, CardFormLayout } from "../layout";

export const FormPersonalData = ({ user, setUser, numStep, setNumStep, setErrors }) => {

    const [personalData, setPersonalData] = useState({
        'email': '',
        'phone': ''
    });
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

    const onSubmit = (data, e) => {
        setErrors(null);
        setPersonalData({
            ...data
        });
        if (data && data.email.trim() !== '' && data.phone.trim() !== '') {
            const newNumStep = numStep > 4 ? numStep : 4;
            setNumStep(newNumStep);
            setUser({
                ...user,
                ...data
            });
        }
    };

    const onError = (errors, e) => {
        setErrors(errors);
        setPersonalData(``);
        setUser({
            ...user,
            email: '',
            phone: ''
        });
    };

    return (
        <>
            <CardFormLayout>
                <h5 className="card-title">Datos de contacto</h5>
                <form onSubmit={handleSubmit(onSubmit, onError)}>

                    <input
                        type='email'
                        id='email'
                        name='email'
                        className="form-control mt-2"
                        placeholder="* Correo electrónico"
                        {...register(
                            'email',
                            {
                                required: "El correo electrónico es obligatorio.",
                                pattern: {
                                    value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                                    message: 'Formato incorrecto.'
                                },
                                maxLength: {
                                    value: 255,
                                    message: 'La longitud máxima del campo es de 255 caracteres.'
                                }
                            }
                        )}
                    />
                    {errors.email && <span className='invalid-feedback d-block'>{errors.email.message}</span>}

                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        className="form-control mt-2"
                        placeholder="* Teléfono celular"
                        {...register(
                            'phone',
                            {
                                required: "El teléfono celular es obligatorio.",
                                pattern: {
                                    value: /^(\+{0,1}\d{10,13})$/,
                                    message: 'Formato incorrecto.'
                                },
                                maxLength: {
                                    value: 14,
                                    message: 'La longitud máxima del campo es de 14 caracteres.'
                                }
                            }
                        )}
                    />
                    {errors.phone && <span className='invalid-feedback d-block'>{errors.phone.message}</span>}

                    <button className="btn btn-outline-primary mt-2 float-end">
                        <i className="fa fa-paper-plane"></i>
                    </button>

                </form>
            </CardFormLayout>

            {
                numStep > 3 ?
                    <CardAnswerLayout>
                        Correo electrónico: {personalData.email} <br></br>
                        Teléfono celular: {personalData.phone}
                    </CardAnswerLayout>

                    : ''
            }
        </>
    )
}
