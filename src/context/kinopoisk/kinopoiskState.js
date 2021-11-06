import {KinopoiskContext} from "./kinopoiskContext";
import {useReducer} from "react";
import {KinopoiskReducer} from "./kinopoiskReducer";
import axios from "axios";
import {GET_FRAMES, GET_MOVIE, GET_MOVIES, IS_EMPTY, IS_ERROR, SET_LOADING} from "../types";

const API_KEY = "0f3edfa1-7358-4898-ae4f-0f0228e3f274";

export const KinopoiskState = ({children}) => {

    const initialState = {
        movies: [],
        movie: {},
        loading: false,
        empty: false,
        error: false,
        errorMessage: '',
        frames: []
    }

    const [state, dispatch] = useReducer(KinopoiskReducer, initialState)

    const getMovies = async (value) => {
        setLoading(true);

        await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${value}&page=1`,
            {headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
                }
            }
        ).then((response) => {

            isEmpty(response.data.films);

            dispatch({
                type: GET_MOVIES,
                payload: response.data.films,
            })

            dispatch({
                type: IS_ERROR,
                payload: false
            })

        }).catch((error) => {
            setLoading(false);

            dispatch({
                type: IS_ERROR,
                payload: {error: true, errorMessage: error.message}
            })

        })
    }

    const getMovie = async id => {
        setLoading(true);

        await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
            {headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": API_KEY
                }
        }).then((response) => {

            dispatch({
                type: GET_MOVIE,
                payload: response.data
            })

            dispatch({
                type: IS_ERROR,
                payload: false
            })

        }).catch((error) => {
            setLoading(false);

            dispatch({
                type: IS_ERROR,
                payload: {error: true, errorMessage: error.message}
            })

        })
    }

    const getFrames = async id => {
        const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY
            }
        })

        dispatch({
            type: GET_FRAMES,
            payload: response.data.frames
        })
    }

    const setLoading = (state) => dispatch({
        type: SET_LOADING,
        payload: state
    });

    const isEmpty = (array) => {
        if (array.length) {
            dispatch({
                type: IS_EMPTY,
                payload: false
            })
        } else {
            dispatch({
                type: IS_EMPTY,
                payload: true
            })
        }
    }

    const {movies, movie, loading, empty, error, errorMessage, frames} = state;

    return (
        <KinopoiskContext.Provider value={{
            getMovies, setLoading, isEmpty, getMovie, getFrames,
            movies, movie, loading, empty, error, errorMessage, frames
        }}>
            {children}
        </KinopoiskContext.Provider>
    )
}