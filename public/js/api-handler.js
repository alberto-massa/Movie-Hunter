const { default: axios } = require('axios');

class CharactersApiHandler {
    constructor() {
        this.app = axios.create({
            baseURL: 'https://api.themoviedb.org/3'
        })
    }

    getPopulars = () => this.app.get(`/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`)
    getUpcoming = () => this.app.get(`/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&region=US`)
    getDetails = movieId => this.app.get(`/movie/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    getFavourites = (...favourites) => this.app.get(`/movie/${(favourites)}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    getTrending = () => this.app.get(`/trending/movie/day?api_key=${process.env.TMDB_KEY}`)
}

module.exports = CharactersApiHandler