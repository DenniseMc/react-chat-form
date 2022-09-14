import { useState } from "react"
import { useForm } from 'react-hook-form'
import { CardAnswerLayout, CardFormLayout } from "../layout";

export const FormBirthDate = ({ user, setUser, numStep, setNumStep, setErrors }) => {

    const [birthDate, setBirthDate] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })

    const onSubmit = (data, e) => {
        setErrors(null);
        setBirthDate(`${data.year}-${data.month}-${data.day}`);
        if (data && data.day > 0 && data.month > 0 && data.year >= 1900) {
            const newNumStep = numStep > 3 ? numStep : 3;
            setNumStep(newNumStep);
            setUser({
                ...user,
                birthDate: `${data.year}-${data.month}-${data.day}`
            });
        }
    };

    const onError = (errors, e) => {
        setErrors(errors);
        setBirthDate(``);
        setUser({
            ...user,
            birthDate: ''
        });
    };

    return (
        <>
            <CardFormLayout>
                <h5 className="card-title">¿Cuál es tu fecha de nacimiento?</h5>
                <form onSubmit={handleSubmit(onSubmit, onError)}>

                    <input
                        type='number'
                        id='day'
                        name='day'
                        className="form-control mt-2"
                        placeholder="* Día"
                        {...register(
                            'day',
                            {
                                required: "El día es obligatorio.",
                                max: {
                                    value: 31,
                                    message: 'Día incorrecto'
                                },
                                min: {
                                    value: 1,
                                    message: 'El día no puede ser menor a 1'
                                }
                            }
                        )}
                    />
                    {errors.day && <span className='invalid-feedback d-block'>{errors.day.message}</span>}

                    <input
                        type='number'
                        id='month'
                        name='month'
                        className="form-control mt-2"
                        placeholder="* Mes"
                        {...register(
                            'month',
                            {
                                required: "El mes es obligatorio.",
                                max: {
                                    value: 12,
                                    message: 'Mes fuera de rango.'
                                },
                                min: {
                                    value: 1,
                                    message: 'El mes no puede ser menor a 1'
                                }
                            }
                        )}
                    />
                    {errors.month && <span className='invalid-feedback d-block'>{errors.month.message}</span>}

                    <input
                        type='number'
                        id='year'
                        name='year'
                        className="form-control mt-2"
                        placeholder="* Año"
                        {...register(
                            'year',
                            {
                                required: "El año es obligatorio.",
                                max: {
                                    value: 2022, //poner año actual
                                    message: 'El año no puede ser mayor al actual'
                                },
                                min: {
                                    value: 1900,
                                    message: 'El año no puede ser menor a 1900'
                                }
                            }
                        )}
                    />
                    {errors.year && <span className='invalid-feedback d-block'>{errors.year.message}</span>}

                    <button className="btn btn-outline-primary mt-2 float-end">
                        <i className="fa fa-paper-plane"></i>
                    </button>

                </form>
            </CardFormLayout>

            {
                numStep > 2 ?
                    <CardAnswerLayout>
                        {birthDate}            
                    </CardAnswerLayout>
                    : ''
            }

        </>
    )
}
