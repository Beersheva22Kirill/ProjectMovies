import MoviesService from "./service/MovieService.js";
import RegistrationService from "./service/registrationService.js";
import ApplicationMenu from "./ui_ux/ApplicationMenu.js";
import ModalDetails from "./ui_ux/ModalDetails.js";
import PageController from "./ui_ux/PageController.js";
import Registration from "./ui_ux/RegistrationForm.js";
import Grid from "./ui_ux/grid.js";


//constants
const sectionsForBody= ['main-menu','grid-movies']
const buttonsOfMenu = ['Popularity movies','Now playing','Upcoming','Wotching','Favorites']
const columnsOfMovies = ['Poster','Details'];
const TITLES_FOR_DETAILS = ['Production countries:','Popularity:','Genres:']



//objects
const mainMenu = new ApplicationMenu('main-menu-section-id',buttonsOfMenu, menuHendler)
const movieService = new MoviesService();
const tableMovies = new Grid('content-id',columnsOfMovies,callbackFnGriRrow)
const modalDetails = new ModalDetails('modal-window-id');
const pageController = new PageController('page-controller-id',callBackPageController);
const logInForm = new Registration('login-place','modal-window-id',callbackFnReg,callbackFnValid)
const registrationService = new RegistrationService('http://localhost:3500/employees/')

//functions
async function menuHendler(index){

    switch (index) {
        case 0:{
            const popularyMoviesList = await movieService.getPopularyMovies(1);
            createTableMovies(popularyMoviesList,'Popularity movies',1);   
        }    
            break;
        case 1: {
            const nowPlayingList = await movieService.getNowPlaying(1);
            createTableMovies(nowPlayingList,`Now playing from ${nowPlayingList.dates.minimum} to ${nowPlayingList.dates.maximum}`,1);   
            break;
        }
        case 2: {
            const upcomingList = await movieService.getUpcoming(1);
            createTableMovies(upcomingList,`Upcoming from ${upcomingList.dates.minimum} to ${upcomingList.dates.maximum}`,1);   
            break;
        }
    }

}

async function getDataForTable(object){
    const genres = await movieService.getGenres();
    const res_array = object.map(element => {
        const genres_name = [];
        genres.genres.forEach(genre => {
            if(element.genre_ids.includes(genre.id)){
                genres_name.push(genre.name);
            }
        })
        
        return [element.original_title,element.release_date,...genres_name];
    })

    return res_array
}

function getImagePath(object){
    
    return object.map(element => [movieService.getMainImagePath() + element.poster_path])
}

function getIdMovies(object){

    return object.map(element => element.id)

}

function getOverviews(object){
    return object.map(element => element.overview)
}

async function createTableMovies(object,title,numberPage){
    const dataOfMovies = await getDataForTable(object.results);
    const idMovies = getIdMovies(object.results);
    const imagesPath = getImagePath(object.results);
    const overviews = getOverviews(object.results);
    tableMovies.fillTable(imagesPath,dataOfMovies,overviews,idMovies,title)
    pageController.createPageController(object.total_pages,10,numberPage);
}

async function callBackPageController(numberPage){
    switch (mainMenu.getActivIndex()) {
        case 0:
            const popularyMoviesList = await movieService.getPopularyMovies(numberPage);
            createTableMovies(popularyMoviesList,'Popularity movies',numberPage);
        break;
        case 1:
            const nowPlayingList = await movieService.getNowPlaying(numberPage);
            createTableMovies(nowPlayingList,`Now playing from ${nowPlayingList.dates.minimum} to ${nowPlayingList.dates.maximum}`,numberPage); 
        break;
        case 2:
            const upcomingList = await movieService.getUpcoming(numberPage);
            createTableMovies(upcomingList,`Upcoming from ${upcomingList.dates.minimum} to ${upcomingList.dates.maximum}`,numberPage);   
        break;
        
    }
}

async function callbackFnGriRrow(id){
    const dataMovie = await movieService.getDetailsData(id);
    const arrayForDetails = getDetails(dataMovie);

    const imagesPath = movieService.getMainImagePath() + dataMovie.poster_path;
    modalDetails.openWindow(dataMovie.original_title,arrayForDetails,dataMovie.overview,imagesPath,TITLES_FOR_DETAILS);
}

function getDetails(object){
        const res = [object.production_countries.map(el => el.name),
            object.popularity,object.genres.map(el => el.name)]
    return res

}

function callbackFnReg(){

}

function callbackFnValid(){
    
}



