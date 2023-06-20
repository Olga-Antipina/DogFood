import { useForm } from "react-hook-form"
import './modals.css'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { ReactComponent as OpenEye } from './img/openEye.svg'
import { ReactComponent as ClosedEye } from './img/closedEye.svg'
import { useState } from "react";

export const EnterWithFormNewPassword = ({ isRequired = true, authorization, setAuthorization }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [type, setType] = useState(true);

    const navigate = useNavigate();

    const sendData = (data) => {
        api.enterWithNewPassword(data)
            .then((res) => {
                if (res.err || res.error) {
                    alert("ОШИБКА: " + res.message);
                } else {
                    alert('Пароль успешно обновлён!')
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

    return (
        <div className="behind_modal">
            <div className="modals">
                <div className="modals__title">Восстановление пароля</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <div className="modals__warn-new-pass">Введите код из письма и новый пароль</div>

                    <input type="text" {...register('token', { required: "Введите секретный код из письма для восстановления пароля" })} placeholder="Token" className="modals__input" />
                    {errors?.token ? <div className="modals__err">{errors?.token.message}</div> : <div className="modals__err"></div>}

                    <div className="modals__pass">
                        <input type={type ? "password" : "text"} {...register('password', passwordRegister)} placeholder="Новый пароль" className="modals__input" />
                        <span className="modals__eye" onClick={(state) => setType(!type)}>{type ? <OpenEye /> : <ClosedEye />}</span>
                        {errors?.password ? <div className="modals__err">{errors?.password.message}</div> : <div className="modals__err"></div>}
                    </div>

                    <button type="submit" className="modals__button__first">Отправить</button>
                    <Link to="/" style={{ textDecoration: 'none' }}><button className="modals__button__second">Регистрация</button></Link>
                </form>
            </div>
        </div>
    )
}