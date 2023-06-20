import React, { useState } from "react";
import { useForm } from "react-hook-form"
import './modals.css'
import { ReactComponent as OpenEye } from './img/openEye.svg'
import { ReactComponent as ClosedEye } from './img/closedEye.svg'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";


export const FormRegister = ({ isRequired = true }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [type, setType] = useState(true);

    const navigate = useNavigate();

    const sendData = async (data) => {
        await api.register(data)
            .then((res) => {
                if (res.err) {                    
                    alert("ОШИБКА " + res.err.statusCode + ": " + res.message);
                } else {
                    alert('Вы успешно зарегистрированы!')
                    navigate('/authorization');
                    return res;
                }
            })
    }

    const passwordRegister = {
        required: {
            value: isRequired,
            message: "Введите пароль"
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "Пароль должен содержать 8 символов, в том числе не менее 1 буквы латинского алфавита и 1 цифры"
        }
    }

    const emailRegister = {
        required: {
            value: isRequired,
            message: "Введите email"
        },
        pattern: {
            value: /^(.+)@(.+)\.(.{2,}$)/,
            message: "Email введён некорректно"
        }
    }

    return (
        <div className="behind_modal">
            <div className="modals">
                <div className="modals__title">Регистрация</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <input type="text" {...register('name', { required: "Введите имя" })} placeholder="Имя" className="modals__input" />
                    {errors?.name ? <div className="modals__err">{errors?.name.message}</div> : <div className="modals__err"></div>}

                    <input type="text" {...register('group', { required: "Введите номер группы" })} placeholder="Номер группы" className="modals__input" />
                    {errors?.group ? <div className="modals__err">{errors?.group.message}</div> : <div className="modals__err"></div>}

                    <input type="text" {...register('email', emailRegister)} placeholder="Email" className="modals__input" />
                    {errors?.email ? <div className="modals__err">{errors?.email.message}</div> : <div className="modals__err"></div>}

                    <div className="modals__pass">
                        <input type={type ? "password" : "text"} {...register('password', passwordRegister)} placeholder="Пароль" className="modals__input" />
                        <span className="modals__eye" onClick={(state) => setType(!type)}>{type ? <OpenEye /> : <ClosedEye />}</span>
                        {errors?.password ? <div className="modals__err">{errors?.password.message}</div> : <div className="modals__err"></div>}
                    </div>

                    <div className="modals__warn">Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности, а также соглашаетесь на информационную рассылку</div>

                    <button type="submit" className="modals__button__first">Зарегистрироваться</button>
                    <Link to="/authorization" style={{ textDecoration: 'none' }}><button className="modals__button__second">Войти</button></Link>
                </form>
            </div>
        </div>
    )
}