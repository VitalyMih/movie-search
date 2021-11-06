import classes from './Card.module.scss';
import {Link} from "react-router-dom";

export const Card = ({movie}) => {
    const ratingClasses = [classes.rating]

    if (+movie.rating) {
        if (movie.rating > 7) {
            ratingClasses.push(classes.green)
        } else if (movie.rating > 5) {
            ratingClasses.push(classes.orange)
        } else {
            ratingClasses.push(classes.red)
        }
    } else {
        ratingClasses.push(classes.gray)
    }

    return (
        <div className={classes.Card}>
            <div className={classes.body}>
                <img
                    src={movie.posterUrl}
                    alt={movie.nameRu}
                    className={classes.image}/>

                    {+movie.rating
                    ? <div className={ratingClasses.join(' ')}>
                        <div className={classes.number}>{movie.rating}</div>
                      </div>
                    : null}

            </div>
            <div className={classes.content}>
                <div className={classes.title}>{movie.nameRu}</div>
                <div className={classes.year}>Год: {movie.year}</div>
            </div>
            <Link
                to={`/movie/${movie.filmId}`}
                className={classes.button}
                target="_blank"
                rel="noreferrer"
            >Открыть</Link>
        </div>
    )
}