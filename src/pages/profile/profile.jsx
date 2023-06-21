import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import './profile.css'
import { ReactComponent as Email } from './img/email.svg'
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from '../../components/productInCard/img/arrow.svg'
import { FormEditUserInfo } from "../../components/forms/editUserInfo";
import { FormEditUserAvatar } from "../../components/forms/editUserAvatar";


export const Profile = ({ setUser }) => {

    const user = useContext(UserContext);

    const [formEditUserInfo, setFormEditUserInfo] = useState(false);
    const [formEditUserAvatar, setFormEditUserAvatar] = useState(false);


    return (

        <div className="profile">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="profile__goHome"><Arrow />&nbsp;&nbsp;В каталог</div>
            </Link>
            <div className="profile__title">Профиль</div>
            <div className="profile__user">                
                <div className="profile__avatar__container">
                    <img src={user.avatar} className="profile__avatar"></img>
                </div>
                <div className="profile__info">
                    <div className="profile__info__name">{user.name}</div>
                    <div className="profile__info__about">{user.about}</div>
                    <div><Email />&nbsp;<span className="profile__info__other">{user.email}</span></div>
                    <div className="profile__info__other">№ группы: {user.group}</div>

                    <button className="profile__button" onClick={(state) => setFormEditUserInfo(!formEditUserInfo)}>Изменить данные</button>
                    {!!formEditUserInfo && <FormEditUserInfo setUser={setUser} formEditUserInfo={formEditUserInfo} setFormEditUserInfo={setFormEditUserInfo}/>}

                    <button className="profile__button" onClick={(state) => setFormEditUserAvatar(!formEditUserAvatar)}>Обновить аватар</button>
                    {!!formEditUserAvatar && <FormEditUserAvatar setUser={setUser} formEditUserAvatar={formEditUserAvatar} setFormEditUserAvatar={setFormEditUserAvatar}/>}
                </div>
            </div>
        </div>
    )
}