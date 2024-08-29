const BASE_POKEMON_URL=import.meta.env.VITE_POKEMON_URL
const BASE_MOVIE_URL=import.meta.env.VITE_MOVIE_URL
const MEDIA_MOVIE_URL=import.meta.env.VITE_MOVIE_URL_MEDIA


const movies=BASE_MOVIE_URL+"/api/movies"

const movie_detail=BASE_MOVIE_URL+"/infos/movies/:id"
const series=BASE_MOVIE_URL+"/api/series"
const serie_detail=BASE_MOVIE_URL+"/infos/series/:id"

const pokemons=BASE_POKEMON_URL+"/api/v1/pokemon"


export default {
    BASE_MOVIE_URL,
    BASE_POKEMON_URL,
    movies,
    movie_detail,
    serie_detail,
    series,
    pokemons
}