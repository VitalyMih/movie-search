import classes from './Search.module.scss';
import React, {useContext, useState} from "react";
import {Alert} from "../Alert/Alert";
import {AlertContext} from "../../context/alert/alertContext";
import {KinopoiskContext} from "../../context/kinopoisk/kinopoiskContext";

export const Search = () => {
    const [value, setValue] = useState('');
    const [inputClass, setClass] = useState(classes.input);
    const alert = useContext(AlertContext);
    const {getMovies} = useContext(KinopoiskContext);

    const onSubmit = (event) => {
        if (event.key !== 'Enter') return;

        if (value.trim()) {
            alert.hide();
            getMovies(value.trim());
            setClass(classes.input);
        } else {
            alert.show('Поле должно быть заполнено!');
            setClass(inputClass + ' ' + classes.error);
        }

        setValue('');
    }

    return (
        <div className={classes.Search}>
            <input
                type="text"
                placeholder="Введите название фильма..."
                value={value}
                className={inputClass}
                onChange={(event) => setValue(event.target.value)}
                onKeyPress={onSubmit}
            />
            <Alert />
        </div>
    )
}