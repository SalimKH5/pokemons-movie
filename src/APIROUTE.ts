const BASE_POKEMON_URL=process.env.POKEMON_URL
const BASE_MOVIE_URL=process.env.MOVIE_URL

const movies=BASE_MOVIE_URL+"/api/movies"

const movie_detail=BASE_MOVIE_URL+"/infos/movies/:id"
const series=BASE_MOVIE_URL+"/api/series"
const serie_detail=BASE_MOVIE_URL+"/infos/series/:id"


export default {
    BASE_MOVIE_URL,
    BASE_POKEMON_URL,
    movies,
    movie_detail,
    serie_detail,
    series,
   
}