const { default: axios } = require('axios');

class CharactersApiHandler {
    constructor() {
        this.app = axios.create({
            baseURL: 'https://api.themoviedb.org/3/movie'
        })
    }

    getPopulars = () => this.app.get(`/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`)
    getUpcoming = () => this.app.get(`/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&region=US`)
    getDetails = movieId => this.app.get(`/${movieId}?api_key=${process.env.TMDB_KEY}&language=en-US`)
    getFavourites = favourites => this.app.get(`/${favourites}?api_key=${process.env.TMDB_KEY}&language=en-US`)

}

module.exports = CharactersApiHandler