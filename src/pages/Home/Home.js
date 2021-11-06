import classes from './Home.module.scss';
import React, {useContext} from "react";
import {Search} from "../../components/Search/Search";
import {Card} from "../../components/Card/Card";
import {KinopoiskContext} from "../../context/kinopoisk/kinopoiskContext";
import {Loading} from "../../components/Loading/Loading";

export const Home = () => {
    const {movies, loading, empty, error, errorMessage} = useContext(KinopoiskContext);

    const getMovies = () => {
        if (error) {
            return <div className={classes.error}>
                        <div>{errorMessage}!</div>
                        <div>Повторите запрос</div>
                    </div>
        } else {
            return movies.map(movie =>
                <React.Fragment key={movie.filmId}>
                    <Card movie={movie}/>
                </React.Fragment>
            )
        }
    }

    return (
        <div className={classes.Home}>
            <Search />
            {empty
            ? <div className={classes.empty}>Ничего не найдено...</div>
            : null}
            <div className={classes.movies}>
                { loading ? <Loading /> : getMovies() }
            </div>
        </div>
    )
}