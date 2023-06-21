import React from "react";
import { useForm } from "react-hook-form"
import './modals.css'
import { ReactComponent as CloseCross } from './img/closeCross.svg'
import { api } from "../../utils/api";


export const FormEditUserAvatar = ({ isRequired = true, formEditUserAvatar, setFormEditUserAvatar, setUser }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const sendData = async (link) => {
        await api.editUserAvatar(link)
            .then((res) => {
                if (res.error) {
                    alert("ОШИБКА " + res.statusCode + ": " + res.message);
                } else {
                    alert('Аватар обновлён');
                    setUser(res);
                    setFormEditUserAvatar(!formEditUserAvatar);
                }
            })
    }

    return (
        <div className="behind_modal edituser">
            <div className="modals edituser__info">
                <div className="modals__title">Новый аватар</div>
                <form onSubmit={handleSubmit(sendData)}>
                    <input type="text" {...register('avatar', { required: "Вставьте ссылку на изображение" })} placeholder="Ссылка на изображение" className="modals__input" />
                    {errors?.avatar ? <div className="modals__err">{errors?.avatar.message}</div> : <div className="modals__err"></div>}

                    <button type="submit" className="modals__button__first">Обновить аватар</button>
                    <CloseCross className="closeCross" onClick={(state) => setFormEditUserAvatar(!formEditUserAvatar)}/>
                </form>
            </div>
        </div>
    )
}