import { useState } from "react"
import { useForm } from 'react-hook-form'
import { CardAnswerLayout, CardFormLayout } from "../layout";

export const FormName = ({ user, setUser, numStep, setNumStep, setErrors }) => {

    const [fullName, setFullName] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

    const onSubmit = (data, e) => {
        setErrors(null);
        setFullName(`${data.name} ${data.secondName} ${data.firstLastName} ${data.secondLastName}`);
        if (data && data.name.trim() !== '' && data.firstLastName.trim() !== '') {
            const newNumStep = numStep > 2 ? numStep : 2;
            setNumStep(newNumStep);
            setUser({
                ...user,
                ...data
            });
        }
    };

    const onError = (errors, e) => {
        setErrors(errors);
        setFullName(``);
        setUser({
            ...user,
            name: '',
            secondName: '',
            firstLastName: '',
            secondLastName: ''
        });
    };

    return (
        <>
            <CardFormLayout>
                <h5 className="card-title">¿Cuál es tu nombre?</h5>
                <form onSubmit={handleSubmit(onSubmit, onError)}>

                    <input
                        type='text'
                        id='name'
                        name='name'
                        className="form-control mt-2"
                        placeholder="* Nombre"
                        {...register(
                            'name',
                            {
                                required: "El nombre es obligatorio.",
                                maxLength: {
                                    value: 255,
                                    message: 'La longitud máxima del campo es de 255 caracteres.'
                                },
                                pattern: {
                                    value: /^([a-zA-Z]+[ ]{0,1}[a-zA-Z]*)*$/,
                                    message: 'Formato incorrecto.'
                                }
                            }
                        )}
                    />
                    {errors.name && <span className='invalid-feedback d-block'>{errors.name.message}</span>}

                    <input
                        type='text'
                        id='secondName'
                        name='secondName'
                        className="form-control mt-2"
                        placeholder="Segundo nombre"
                        {...register(
                            'secondName',
                            {
                                required: false,
                                maxLength: {
                                    value: 255,
                                    message: 'La longitud máxima del campo es de 255 caracteres.'
                                },
                                pattern: {
                                    value: /^([a-zA-Z]+[ ]{0,1}[a-zA-Z]*)*$/,
                                    message: 'Formato incorrecto.'
                                }
                            }
                        )}
                    />
                    {errors.secondName && <span className='invalid-feedback d-block'>{errors.secondName.message}</span>}

                    <input
                        type='text'
                        id='firstLastName'
                        name='firstLastName'
                        className="form-control mt-2"
                        placeholder="* Primer apellido"
                        {...register(
                            'firstLastName',
                            {
                                required: "El primer apellido es obligatorio.",
                                maxLength: {
                                    value: 255,
                                    message: 'La longitud máxima del campo es de 255 caracteres.'
                                },
                                pattern: {
                                    value: /^([a-zA-Z]+[ ]{0,1}[a-zA-Z]*)*$/,
                                    message: 'Formato incorrecto.'
                                }
                            }
                        )}
                    />
                    {errors.firstLastName && <span className='invalid-feedback d-block'>{errors.firstLastName.message}</span>}

                    <input
                        type='text'
                        id='secondLastName'
                        name='secondLastName'
                        className="form-control mt-2"
                        placeholder="Segundo apellido"
                        {...register(
                            'secondLastName',
                            {
                                required: false,
                                maxLength: {
                                    value: 255,
                                    message: 'La longitud máxima del campo es de 255 caracteres.'
                                },
                                pattern: {
                                    value: /^([a-zA-Z]+[ ]{0,1}[a-zA-Z]*)*$/,
                                    message: 'Formato incorrecto.'
                                }
                            }
                        )}
                    />
                    {errors.secondLastName && <span className='invalid-feedback d-block'>{errors.secondLastName.message}</span>}

                    <button className="btn btn-outline-primary mt-2 float-end">
                        <i className="fa fa-paper-plane"></i>
                    </button>

                </form>
            </CardFormLayout>

            {
                numStep > 1 ?
                    <CardAnswerLayout>
                        {fullName}
                    </CardAnswerLayout>
                    : ''
            }
        </>
    )
}
