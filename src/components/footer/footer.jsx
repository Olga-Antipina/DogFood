import React, { memo } from "react"
import './footer.css'
import { ReactComponent as Logo } from './img/logo.svg'
import { ReactComponent as ExtremismIcon } from './img/extremism_icon.svg'
import { ReactComponent as TelegramIcon } from './img/telegram_icon.svg'
import { ReactComponent as ViberIcon } from './img/viber_icon.svg'
import { ReactComponent as VKIcon } from './img/vk_icon.svg'
import { ReactComponent as WhatsappIcon } from './img/whatsapp_icon.svg'
import { Link } from "react-router-dom"

export const Footer = memo(() => {
    return <footer>
        <div className="container">
            <div className="footer__wrapper">
                <div>
                    <a href="/"><Logo className="footer__logo" /></a>
                    <div className="footer__logo__info">© «Интернет-магазин DogFood.ru»</div>
                </div>
                <div className="footer__pages">
                    <div className="footer__links">
                        <Link to="/">Каталог</Link>
                    </div><br></br>
                    <div className="footer__links">Акции</div><br></br>
                    <div className="footer__links">Новости</div><br></br>
                    <div className="footer__links">Отзывы</div><br></br>
                </div>
                <div className="footer__info">
                    <div className="footer__links">Оплата и доставка</div><br></br>
                    <div className="footer__links">
                        <Link to="/FAQ">Часто спрашивают<strong> (NEW!)</strong></Link>
                    </div><br></br>
                    <div className="footer__links">Обратная связь</div><br></br>
                    <div className="footer__links">Контакты</div><br></br>
                </div>
                <div className="footer__contacts">
                    <div className="footer__contacts__phone">Мы на связи<br></br><br></br>8 (999) 00-00-00</div>
                    <div className="footer__contacts__email">dogfood.ru@gmail.com</div>
                    <div className="footer__contacts__icons">
                        <TelegramIcon />
                        <WhatsappIcon />
                        <ViberIcon />
                        <ExtremismIcon />
                        <VKIcon />
                    </div>
                </div>
            </div>
        </div>
    </footer>
})


