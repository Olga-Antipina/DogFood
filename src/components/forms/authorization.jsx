import React, { useState } from "react";
import { useForm } from "react-hook-form"
import './modals.css'
import { ReactComponent as OpenEye } from './img/openEye.svg'
import { ReactComponent as ClosedEye } from './img/closedEye.svg'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export const FormAuthorization = ({ isRequired = true, setAuthorization }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [type, setType] = useState(true);

    const navigate = useNavigate();

    const sendData = (data) => {
        api.authorization(data)
            .then((res) => {
                if (res.err) {
                    alert("ОШИБКА " + res.err.statusCode + ": " + res.message);
                } else {
                    localStorage.setItem('token', res.token);
                    setAuthorization(!!localStorage.getItem('token'));
                    navigate('/');
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
                <div className="modals__title">Вход</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <input type="text" {...register('email', emailRegister)} placeholder="Email" className="modals__input" />
                    {errors?.email ? <div className="modals__err">{errors?.email.message}</div> : <div className="modals__err"></div>}

                    <div className="modals__pass">
                        <input type={type ? "password" : "text"} {...register('password', passwordRegister)} placeholder="Пароль" className="modals__input" />
                        <span className="modals__eye" onClick={(state) => setType(!type)}>{type ? <OpenEye /> : <ClosedEye />}</span>
                        {errors?.password ? <div className="modals__err">{errors?.password.message}</div> : <div className="modals__err"></div>}
                    </div>

                    <Link to="/new_password" style={{ textDecoration: 'none' }}><div className="modals__new-password">Восстановить пароль</div></Link>

                    <button type="submit" className="modals__button__first">Войти</button>
                    <Link to="/" style={{ textDecoration: 'none' }}><button className="modals__button__second">Регистрация</button></Link>
                </form>
            </div>
        </div>
    )
}