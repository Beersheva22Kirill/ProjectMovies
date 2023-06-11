import MoviesService from "./service/MovieService.js";
import RegistrationService from "./service/registrationService.js";
import ApplicationMenu from "./ui_ux/ApplicationMenu.js";
import ModalDetails from "./ui_ux/ModalDetails.js";
import PageController from "./ui_ux/PageController.js";
import Registration from "./ui_ux/RegistrationForm.js";
import FilterForm from "./ui_ux/FilterForm.js";
import Grid from "./ui_ux/grid.js";
import Search from "./ui_ux/SearchElement.js";


//constants and variables
const sectionsForBody= ['main-menu','grid-movies']
const buttonsOfMenu = ['Popularity movies','Now playing','Upcoming','Wotching','Favorites']
const columnsOfMovies = ['Poster','Details'];
const TITLES_FOR_DETAILS = ['Production countries:','Popularity:','Genres:']
const LOGIN_USER = 'LogInUser';
let ACTIVE_USER = undefined;
let FILTER_OBJECT;
let SEARCH_OBJECT;



//objects

const mainMenu = new ApplicationMenu('main-menu-section-id',checkLocalStorage(), menuHendler)
const movieService = new MoviesService('2c46288716a18fb7aadcc2a801f3fc6b');
const tableMovies = new Grid('content-id',columnsOfMovies,callbackFnGriRrow)
const modalDetails = new ModalDetails('modal-window-id',callbackAddMovieToUser);
const pageController = new PageController('page-controller-id',callBackPageController);
const logInForm = new Registration('login-place','modal-window-id',callbackFnReg,callbackFnValid,callbackLogOut,ACTIVE_USER)
const registrationService = new RegistrationService('http://localhost:3500/users')
const filterForm = new FilterForm('filter-place','modal-window-id',setOptionsOfSearch,callbackFilter);
const searchInput = new Search('search-place',callbackSearch);



//functions
async function callbackSearch(object){
    const string = object.string_name.split(' ').join('+');
    const listSearch = await movieService.getListBySearch(string)
    SEARCH_OBJECT = string;
    createTableMovies(listSearch,`List of search`,1)


}

async function setOptionsOfSearch(parentId){
    const genresSelect = document.getElementById(`${parentId}-genres-id`)
    const regionSelect = document.getElementById(`${parentId}-regions-id`)
    const languageSelect = document.getElementById(`${parentId}-select-language-id`)
    const genresName = genresFromAPI.genres.map(element => element.name);
    const regionsName = regionsFromAPI.results.map(element => element.english_name);
    const languageName =  languageFromAPI.map(element => element.english_name);
    filterForm.setOptionsForSearch(genresSelect,genresName.sort(),'Select genres')
    filterForm.setOptionsForSearch(regionSelect,regionsName.sort(),'Select region')
    filterForm.setOptionsForSearch(languageSelect,languageName.sort(),'Select language of movie')
}

async function menuHendler(index){
    pageController.currentIndex = 1;
    FILTER_OBJECT = undefined;
    SEARCH_OBJECT = undefined;
    switch (index) {
        case 0:{
            const popularyMoviesList = await movieService.getPopularyMovies(1);
            createTableMovies(popularyMoviesList,'Popularity movies',1);
            pageController.openPageController(); 
            break;  
        }    
            
        case 1: {
            const nowPlayingList = await movieService.getNowPlaying(1);
            createTableMovies(nowPlayingList,`Now playing from ${nowPlayingList.dates.minimum} to ${nowPlayingList.dates.maximum}`,1);   
            pageController.openPageController(); 
            break;
        }
        case 2: {
            const upcomingList = await movieService.getUpcoming(1);
            createTableMovies(upcomingList,`Upcoming from ${upcomingList.dates.minimum} to ${upcomingList.dates.maximum}`,1);   
            pageController.openPageController(); 
            break;
        }

        case 3: {
            await movieService.setlistMovie(ACTIVE_USER.watches)
            const watchindList = movieService.getListOfMovies();
            createTableMovies(watchindList,`Watches list of user ${ACTIVE_USER.username}`,1) 
            pageController.hidePageController();
            break;
        }

        case 4: {
            await movieService.setlistMovie(ACTIVE_USER.favorites)
            const watchindList = movieService.getListOfMovies();
            createTableMovies(watchindList,`Favorites list of user ${ACTIVE_USER.username}`,1) 
            pageController.hidePageController();
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
    if(object.errors == undefined){
    const dataOfMovies = await getDataForTable(object.results);
    const idMovies = getIdMovies(object.results);
    const imagesPath = getImagePath(object.results);
    const overviews = getOverviews(object.results);
    tableMovies.fillTable(imagesPath,dataOfMovies,overviews,idMovies,title)
    pageController.createPageController(object.total_pages,10,numberPage);
    } else {
        object.errors.forEach(element => alert(`${element}`))
    }
}

async function callBackPageController(numberPage){
if(FILTER_OBJECT == undefined && SEARCH_OBJECT == undefined) {
    switch (mainMenu.getActivIndex()) {
        case 0:{
            const popularyMoviesList = await movieService.getPopularyMovies(numberPage);
            createTableMovies(popularyMoviesList,'Popularity movies',numberPage);  
            break;
        }
            
        case 1:{
            const nowPlayingList = await movieService.getNowPlaying(numberPage);
            createTableMovies(nowPlayingList,`Now playing from ${nowPlayingList.dates.minimum} to ${nowPlayingList.dates.maximum}`,numberPage); 
            break;
        }
            
        case 2:{
            const upcomingList = await movieService.getUpcoming(numberPage);
            createTableMovies(upcomingList,`Upcoming from ${upcomingList.dates.minimum} to ${upcomingList.dates.maximum}`,numberPage);   
            break;
        }
        default : {
            const topList = await movieService.getTopMovie(numberPage);
            createTableMovies(topList,`Top rated movies`,numberPage);   
            break;
        }     
    }
} else if (FILTER_OBJECT !=undefined){
    const listFilterMovies = await movieService.getListByDiscovery(FILTER_OBJECT,numberPage);
    createTableMovies(listFilterMovies,`Result of filter`,numberPage);       
} else if (SEARCH_OBJECT != undefined){
    const listSearchMovies = await movieService.getListBySearch(SEARCH_OBJECT,numberPage);
        createTableMovies(listSearchMovies,`List of search`,numberPage);
}   
    
}

async function callbackFnGriRrow(id){
    const dataMovie = await movieService.getDetailsData(id);
    const arrayForDetails = getDetails(dataMovie);

    const imagesPath = movieService.getMainImagePath() + dataMovie.poster_path;
    modalDetails.openWindow(dataMovie.id,dataMovie.original_title,arrayForDetails,dataMovie.overview,imagesPath,TITLES_FOR_DETAILS,ACTIVE_USER);
}


function getDetails(object){
        const res = [object.production_countries.map(el => el.name),
            object.popularity,object.genres.map(el => el.name)]
    return res

}

async function callbackFnReg(newUser){
    let registredUser;
    const user = await registrationService.getUserByName(newUser.username);
    if(user.length == 0){
        registredUser = await registrationService.addUser(newUser);
        alert(`User with user name ${newUser.username} registred`);
    } else {
        alert(`User with user name ${newUser.username} exist`);
    }
    return registredUser;
}

async function callbackFnValid(user){
    const loginUser = await registrationService.checkUser(user.username,user.password);
        if(loginUser.length == 1){
            localStorage.setItem(LOGIN_USER,JSON.stringify(loginUser[0]));
            checkLocalStorage();
            location.reload();
        } else{
            alert(`Username or password not correct`)
        }
              
    return loginUser;
}

function checkLocalStorage(){
    const userFromLocalStroge = JSON.parse(localStorage.getItem(LOGIN_USER));
    const buttonsOfMenu = ['Popularity movies','Now playing','Upcoming']
        if(userFromLocalStroge != null){
            ACTIVE_USER = userFromLocalStroge;
            buttonsOfMenu.push('Watching')
            buttonsOfMenu.push('Favorites')
        }
    return buttonsOfMenu;
}

function callbackLogOut(){
    localStorage.removeItem(LOGIN_USER);
    location.reload();
    
}

function callbackAddMovieToUser(addMovie,typeList,idMovie){
    if(ACTIVE_USER != undefined){
        if(addMovie){
            addMovieId(typeList, idMovie);
        } else {
            removeMovieId(typeList, idMovie);
        }
        localStorage.setItem(LOGIN_USER,JSON.stringify(ACTIVE_USER));
        registrationService.updateUser(ACTIVE_USER);
        rebildTable();
    } else {
        logInForm.showForm();
    }
   

}

function rebildTable(){
    switch (mainMenu.getActivIndex()) {
        case 3: {
            menuHendler(3)
            break;
        }
        case 4:{
            menuHendler(4)
            break;
        }     
    }
}

function removeMovieId(typeList, idMovie) {
    switch (typeList) {
        case 'watch': {
            const index = ACTIVE_USER.watches.indexOf(idMovie);
            ACTIVE_USER.watches.splice(index, 1);
            break;
        }
        case 'favorite': {
            const index = ACTIVE_USER.favorites.indexOf(idMovie);
            ACTIVE_USER.favorites.splice(index, 1);
            break;
        }
    }
}

function addMovieId(typeList, idMovie) {
    switch (typeList) {
        case 'watch': {
            ACTIVE_USER.watches.push(idMovie);
        }
            break;
        case 'favorite': {
            ACTIVE_USER.favorites.push(idMovie);
        }
    }
}

async function callbackFilter(object){
    let objectToSearch = {};
    objectToSearch.yearToSearch = object.year;
    objectToSearch.genresToSearch = genresFromAPI.genres.filter(genre => object.genres.includes(genre.name));
    objectToSearch.regionToSearch = regionsFromAPI.results.filter(region => object.regions.includes(region.english_name))
    objectToSearch.languageToSearch = languageFromAPI.filter(language => object.language.includes(language.english_name))
    const listMovies = await movieService.getListByDiscovery(objectToSearch);
    FILTER_OBJECT = objectToSearch;
    createTableMovies(listMovies,'Result of filter',1)
}



//start action

movieService.getTopMovie(1).then(object => {
    createTableMovies(object,'Top rated movies',1)
})

const genresFromAPI =  await movieService.getGenres();
const regionsFromAPI =  await movieService.getRegions();
const languageFromAPI =  await movieService.getLanguages();
