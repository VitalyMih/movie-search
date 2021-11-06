import classes from './About.module.scss';
import React from "react";

export const About = () => {
    return (
        <div className={classes.About}>
            <div className={classes.container}>
                <div className={classes.title}>Информация о приложении</div>
                <div className={classes.instruction}>Введите в форму для поиска название фильма, которое Вы хотите найти.</div>
                <div className={classes.text}>Карточка фильма содержит оценку фильма по мнению пользователей сайта КиноПоиск, а также ссылку на страницу фильма на сайте https://www.kinopoisk.ru</div>
                <div className={classes.thanks}>Спасибо за то, что пользуетесь нашим приложением!</div>
            </div>
        </div>
    )
}