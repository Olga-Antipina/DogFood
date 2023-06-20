import { useForm } from "react-hook-form"
import './modals.css'
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export const FormNewPassword = ({ isRequired = true, authorization, setAuthorization }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const sendData = (data) => {
        api.newPassword(data)
            .then((res) => {
                if (res.err) {                    
                    alert("ОШИБКА " + res.err.statusCode + ": " + res.message);
                } else {
                    alert('Письмо отправлено!')
                    navigate('/enterWithNewPassword');
                    return res;
                }
            })
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
                <div className="modals__title">Восстановление пароля</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <div className="modals__warn-new-pass">Для получения временного пароля необходимо ввести email, указанный при регистрации</div>

                    <input type="text" {...register('email', emailRegister)} placeholder="Email" className="modals__input" />
                    {errors?.email ? <div className="modals__err">{errors?.email.message}</div> : <div className="modals__err"></div>}
                    <div className="modals__warn-new-pass">Срок действия временного пароля - 24 часа</div>

                    <button type="submit" className="modals__button__first">Отправить</button>
                    <Link to="/" style={{ textDecoration: 'none' }}><button className="modals__button__second">Регистрация</button></Link>
                </form>
            </div>
        </div>
    )
}