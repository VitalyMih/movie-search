import classes from './Navbar.module.scss';
import React from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={classes.Navbar}>
            <Link to="/" className={classes.logo}>Movie Search</Link>
            <div className={classes.nav}>
                <ul className={classes.list}>
                    <li className={classes.item}><Link to="/" className={classes.link}>Главная</Link></li>
                    <li className={classes.item}><Link to="/about" className={classes.link}>Информация</Link></li>
                </ul>
            </div>
        </div>
    )
}