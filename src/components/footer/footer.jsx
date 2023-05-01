import React from "react"
import './footer.css'
import { ReactComponent as Logo } from './img/logo.svg'
import { ReactComponent as ExtremismIcon } from './img/extremism_icon.svg'
import { ReactComponent as TelegramIcon } from './img/telegram_icon.svg'
import { ReactComponent as ViberIcon } from './img/viber_icon.svg'
import { ReactComponent as VKIcon } from './img/vk_icon.svg'
import { ReactComponent as WhatsappIcon } from './img/whatsapp_icon.svg'

export const Footer = (props) => {
    return <footer>
        <div className="container">
            <div className="footer__wrapper">
                <div>
                <a href="/"><Logo className="footer__logo"/></a>
                    <div className="footer__logo__info">© «Интернет-магазин DogFood.ru»</div>
                </div>
                <div className="footer__pages">
                    <a href="/">Каталог</a><br></br><br></br>
                    <a href="/">Акции</a><br></br><br></br>
                    <a href="/">Новости</a><br></br><br></br>
                    <a href="/">Отзывы</a><br></br><br></br>
                </div>
                <div className="footer__info">
                    <a href="/">Оплата и доставка</a><br></br><br></br>
                    <a href="/">Часто спрашивают</a><br></br><br></br>
                    <a href="/">Обратная связь</a><br></br><br></br>
                    <a href="/">Контакты</a>
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
}
