import classes from './Movie.module.scss';
import {useContext, useEffect} from "react";
import {KinopoiskContext} from "../../context/kinopoisk/kinopoiskContext";
import React from "react";
import {Loading} from "../../components/Loading/Loading";
import Fancybox from "../../fancyapps/Fancybox/Fancybox";

export const Movie = ({match}) => {
    const movieId = match.params.id;
    const {getMovie, getFrames, movie, frames, loading, error, errorMessage} = useContext(KinopoiskContext);

    useEffect(() => {
        getMovie(movieId);
        getFrames(movieId);
    }, [])

    const getMoviePage = () => {
        if (error) {
            return (
                <div className={classes.error}>
                    <div>{errorMessage}!</div>
                    <div>Повторите запрос</div>
                </div>
            )
        } else {
            return (
                <div className={classes.Movie}>
                    <div className={classes.body}>
                        <div className={classes.image}>
                            <img src={movie.posterUrl} alt={movie.nameRu} className={classes.img}/>
                            <a href={movie.webUrl} target="_blank" className={classes.button}>Открыть на КиноПоиске</a>
                        </div>
                        <div className={classes.about}>
                            <div className={classes.name}>{movie.nameRu}</div>
                            {movie.nameOriginal && <div className={classes.original}>{movie.nameOriginal}</div>}
                            {movie.shortDescription && <div className={classes.short_description}>{movie.shortDescription}</div> }
                            <div className={classes.title}>{
                                movie.serial
                                    ? "О сериале"
                                    : "О фильме"
                            }</div>
                            <table className={classes.table}>
                                <tbody>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Год производства</td>
                                    <td className={classes.column_second}>{movie.year}</td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Страна</td>
                                    <td className={classes.column_second}>{
                                        movie.countries
                                            ? movie.countries.map(country => country.country).join(', ')
                                            : "-"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Жанр</td>
                                    <td className={classes.column_second}>{
                                        movie.genres
                                            ? movie.genres.map(genre => genre.genre).join(', ')
                                            : "-"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Слоган</td>
                                    <td className={classes.column_second} style={{fontStyle: 'italic'}}>{
                                        movie.slogan
                                            ? `«${movie.slogan}»`
                                            : "-"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Тип</td>
                                    <td className={classes.column_second}>{
                                        movie.serial
                                            ? "Сериал"
                                            : "Фильм"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Рейтинг Кинопоиска</td>
                                    <td className={classes.column_second} style={{fontWeight: 'bold'}}>{
                                        movie.ratingKinopoisk
                                            ? movie.ratingKinopoisk
                                            : "-"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>Возраст</td>
                                    <td className={classes.column_second}>{
                                        movie.ratingAgeLimits
                                            ? <div className={classes.age}>{movie.ratingAgeLimits
                                                .split('')
                                                .map(item => +item || item === "0" ? item : null)
                                                .join('')}+</div>
                                            : "-"}
                                    </td>
                                </tr>
                                <tr className={classes.row}>
                                    <td className={classes.column_first}>{
                                        movie.serial
                                            ? "Время серии"
                                            : "Время"
                                    }</td>
                                    <td className={classes.column_second}>{
                                        movie.filmLength
                                            ? `${movie.filmLength} мин`
                                            : "-"}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={classes.description_title}>Описание</div>
                            <div className={classes.description}>{movie.description}</div>
                        </div>
                    </div>
                    {
                        frames.length &&
                        <div className={classes.frames}>
                            <div className={classes.frames_title}>{
                                movie.serial
                                    ? "Кадры из сериала"
                                    : "Кадры из фильма"
                            }</div>
                            <div className={classes.frames_list}>
                                <Fancybox>
                                    {frames
                                        .slice(0, 10)
                                        .map((frame, index) => (
                                            <a
                                                data-fancybox="gallery"
                                                key={index}
                                                className={classes.frame}
                                                href={frame.image}
                                            >
                                                <img src={frame.image} alt={`кадр №${index}`} />
                                            </a>
                                        ))}
                                </Fancybox>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            { loading ? <Loading /> : getMoviePage() }
        </React.Fragment>
    )
}