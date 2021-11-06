import classes from './Alert.module.scss';
import React, {useContext} from "react";
import {AlertContext} from "../../context/alert/alertContext";

export const Alert = () => {
    const {alert} = useContext(AlertContext);

    if (!alert) return null;

    return (
        <div className={classes.Alert}>{alert.text}</div>
    )
}