import React from "react";
import { useForm } from "react-hook-form"
import './modals.css'
import { ReactComponent as CloseCross } from './img/closeCross.svg'
import { api } from "../../utils/api";


export const FormEditUserInfo = ({ isRequired = true, formEditUserInfo, setFormEditUserInfo, setUser }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const sendData = async (data) => {
        await api.editUserInfo(data)
            .then((res) => {
                if (res.error) {
                    alert("ОШИБКА " + res.statusCode + ": " + res.message);
                } else {
                    alert('Данные отредактированы');
                    setUser(res);
                    setFormEditUserInfo(!formEditUserInfo);
                }
            })
    }

    return (
        <div className="behind_modal edituser">
            <div className="modals edituser__info">
                <div className="modals__title">Изменение данных</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <input type="text" {...register('name', { required: "Введите имя" })} placeholder="Имя" className="modals__input" />
                    {errors?.name ? <div className="modals__err">{errors?.name.message}</div> : <div className="modals__err"></div>}

                    <input type="text" {...register('about', { required: "Укажите информацию о себе" })} placeholder="Информация о пользователе" className="modals__input" />
                    {errors?.about ? <div className="modals__err">{errors?.about.message}</div> : <div className="modals__err"></div>}

                    <button type="submit" className="modals__button__first">Изменить данные</button>
                    <CloseCross className="closeCross" onClick={(state) => setFormEditUserInfo(!formEditUserInfo)}/>
                </form>
            </div>
        </div>
    )
}