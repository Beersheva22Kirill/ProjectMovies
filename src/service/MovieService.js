
export default class MoviesService{
    #mainUrl;
    #apiKey;
    #urlImage;
    #movies;
    #fieldsMovie;
    
    constructor(apiKey){
        
        //this.#fieldsMovie = []
        this.#mainUrl = 'https://api.themoviedb.org/3/';
        this.#apiKey = apiKey;
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

    async getRegions(){
        const url = `${this.#mainUrl}/watch/providers/regions?language=en&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getLanguages(){
        const url = `${this.#mainUrl}/configuration/languages?&api_key=${this.#apiKey}`
        return this.#getResponse(url);
    }

    async getTopMovie(page){
        const urlTopMovie = `${this.#mainUrl}movie/top_rated?language=en-US&page=${page}&api_key=${this.#apiKey}`
        const movieArray = await this.#getResponse(urlTopMovie);
        if(movieArray.errors == undefined){
            this.#setMoviFields(movieArray.results[0])
        }
        return movieArray;
        
    }

    #setMoviFields(movie){
        if(this.#fieldsMovie == undefined){
            this.#fieldsMovie = Object.keys(movie)
        }   
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

    async getListByDiscovery(discovery, page = 1){
        let urlDiscovery = `${this.#mainUrl}discover/movie?`
        urlDiscovery += discovery.languageToSearch != '' ? `&with_original_language=${this.#getStrIso639(discovery.languageToSearch)}` : '';
        urlDiscovery += discovery.yearToSearch != '' ? `&primary_release_year=${discovery.yearToSearch}` : '';
        urlDiscovery += discovery.genresToSearch.length > 0 ? `&with_genres=${this.#getStr(discovery.genresToSearch)}` : '';
        urlDiscovery += discovery.regionToSearch.length > 0 ? `&with_origin_country=${this.#getStrIso3166(discovery.regionToSearch)}` : ''
        urlDiscovery +=`&page=${page}&api_key=${this.#apiKey}`
        return this.#getResponse(urlDiscovery)
    }

    async getListBySearch(stringSearch, page = 1){
        const urlSearch = `${this.#mainUrl}search/movie?query=${stringSearch}&page=${page}&api_key=${this.#apiKey}`
    return this.#getResponse(urlSearch)    
    }

    #getStr(array){
        let string;
        array.map(element => {
            if(string == undefined){
                string = `${element.id}`
            } else {
                string +=`AND${element.id}`
            }
        });
        return string;
    }

    #getStrIso3166(array){
        let string;
        array.map(element => {
            if(string == undefined){
                string = `${element.iso_3166_1}`
            } else {
                string +=`AND${element.iso_3166_1}`
            }
        }); 
        return string;
    }

    #getStrIso639(array){
        let string;
        array.map(element => {
            if(string == undefined){
                string = `${element.iso_639_1}`
            } else {
                string +=`AND${element.iso_639_1}`
            }
        }); 
        return string;
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