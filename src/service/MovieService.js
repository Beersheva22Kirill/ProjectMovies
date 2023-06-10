
export default class MoviesService{
    #mainUrl;
    #apiKey;
    #urlImage;
    #movies;
    #fieldsMovie;
    
    constructor(){
        
        this.#fieldsMovie = []
        this.#mainUrl = 'https://api.themoviedb.org/3/';
        this.#apiKey = '2c46288716a18fb7aadcc2a801f3fc6b';
        this.#urlImage = 'https://image.tmdb.org//t/p/w600_and_h900_bestv2'
    }

    async getAllGenres(){
        const url = `${this.#mainUrl}genre/movie/list?language=en&api_key=${this.#apiKey}`
        
        return this.#getResponse(url);
    }

    async getPopularyMovies(page){
        const url = `${this.#mainUrl}movie/popular?language=en-US&page=${page}&api_key=${this.#apiKey}`
       
        return this.#getResponse(url);
    }

    async getNowPlaying(page){
        const url = `${this.#mainUrl}movie/now_playing?language=en-US&page=${page}&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getUpcoming(page){
        const url = `${this.#mainUrl}movie/upcoming?language=en-US&page=${page}&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getDetailsData(id){
        const url = `${this.#mainUrl}movie/${id}?language=en-US&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getGenres(){
        const url = `${this.#mainUrl}/genre/movie/list?language=en&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getTopMovie(page){
        const urlTopMovie = `${this.#mainUrl}/movie/top_rated?language=en-US&page=${page}&api_key=${this.#apiKey}`
        const movieArray = await this.#getResponse(urlTopMovie);
        this.#setMoviFields(movieArray.results[0])
        return movieArray;
    }

    #setMoviFields(movie){
        this.#fieldsMovie = Object.keys(movie)
    }

    async setlistMovie(listMovie){
        this.#movies = {
            results:[]};
        await Promise.all(listMovie.map(async movieId => {
            let movieForAdd = {};
            const urlMovie = `${this.#mainUrl}/movie/${movieId}?api_key=${this.#apiKey}`
            const movie = await this.#getResponse(urlMovie);
            this.#fieldsMovie.forEach(key => movieForAdd[key] = movie[key]);
            movieForAdd.genre_ids = [];
            movie.genres.forEach(el => movieForAdd.genre_ids.push(el.id))
            this.#movies.results.push(movieForAdd);
            
        })) 
        
    }

    getListOfMovies(){
        return this.#movies;
    }


    async #getResponse(url){
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data;
    }

    getMainImagePath(){
        return this.#urlImage;
    }

   
}