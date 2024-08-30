const BASE_POKEMON_URL=import.meta.env.VITE_POKEMON_URL
const BASE_MOVIE_URL=import.meta.env.VITE_MOVIE_URL
const MEDIA_MOVIE_URL=import.meta.env.VITE_MOVIE_URL_MEDIA
const movies=BASE_MOVIE_URL+"search/movies/"
const collections=import.meta.env.VITE_COLECTION_URL



const movie_detail=BASE_MOVIE_URL+"/infos/movies/"

const series=BASE_MOVIE_URL+"/search/series/"
const serie_detail=BASE_MOVIE_URL+"/infos/series"


export default {
    BASE_MOVIE_URL,
    BASE_POKEMON_URL,
    movies,
    movie_detail,
    serie_detail,
    series,
    MEDIA_MOVIE_URL,
    collections
}