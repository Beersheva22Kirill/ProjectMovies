
export default class MoviesService{
    #mainUrl;
    #apiKey;
    #urlImage;
    
    constructor(){
        this.#mainUrl = 'https://api.themoviedb.org/3/';
        this.#apiKey = '2c46288716a18fb7aadcc2a801f3fc6b';
        this.#urlImage = 'https://image.tmdb.org//t/p/w600_and_h900_bestv2'
    }

    async getAllGenres(){
        const url = `${this.#mainUrl}genre/movie/list?language=en&api_key=${this.#apiKey}`
        
        return this.#gerResponse(url);
    }

    async getPopularyMovies(page){
        const url = `${this.#mainUrl}movie/popular?language=en-US&page=${page}&api_key=${this.#apiKey}`
       
        return this.#gerResponse(url);
    }

    async getNowPlaying(page){
        const url = `${this.#mainUrl}movie/now_playing?language=en-US&page=${page}&api_key=${this.#apiKey}`
        return this.#gerResponse(url);
    }

    async getUpcoming(page){
        const url = `${this.#mainUrl}movie/upcoming?language=en-US&page=${page}&api_key=${this.#apiKey}`
        return this.#gerResponse(url);
    }

    async getDetailsData(id){
        const url = `${this.#mainUrl}movie/${id}?language=en-US&api_key=${this.#apiKey}`
        return this.#gerResponse(url);
    }

    getGenres(){
        const url = `${this.#mainUrl}/genre/movie/list?language=en&api_key=${this.#apiKey}`
        return this.#gerResponse(url);
    }

    async #gerResponse(url){
        
        const response = await fetch(url);
        const data = await response.json();
        
        return data;
    }

    getMainImagePath(){
        return this.#urlImage;
    }

   
}