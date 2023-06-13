export default class SearchForm{

    #searchParam;
    #parentId;
    #parentForForm;
    #callBackSetOption;
    #callbackSearchFn;
    #searchObject;
    #genresObject;

    constructor (parentId,parentForForm,callBackSetOption,callbackSearchFn, genres){
        this.#genresObject = genres;
        this.#searchObject = {};
        this.#callBackSetOption = callBackSetOption;
        this.#callbackSearchFn = callbackSearchFn;
        this.parentId = parentId;
        this.#parentForForm = parentForForm;
        const parent = document.getElementById(this.parentId)
        parent.innerHTML = `
        <section id = "${this.#parentId}-section-btn-search-id" class = "section-search">
            <button id = "${this.#parentId}-btn-search-id" class = "section-button">Filter</button>
        </section>`
        this.#setEventShowForm();
    }

    #showForm(){
        const parentElement = document.getElementById(this.#parentForForm)
        parentElement.hidden = false;
        const nowDate = new Date()
        parentElement.innerHTML =`
        <div id = "modalBackground">
            <div class="modal-window">
            <form id = "${this.#parentForForm}-form-search-id" class = "search-form">
            <H1>Parameters for filter</H1>
                <section id = "${this.#parentForForm}-section-search-id" class = "section-search">
                <div>
                    <label  for = "${this.#parentForForm}-input-name">language</label>
                    <select  class = "select-input" name = "language-movie" id = "${this.#parentForForm}-select-language-id"></select>
                </div>
                <div>
                    <label  for = "${this.#parentForForm}-input-year-id">Year</label>
                    <input class = "select-input" name = "year-movie" type = "number" min = "1895" max = ${nowDate.getFullYear++} id = "${this.#parentForForm}-input-year-id" placeholder = "Enter release year of movie">
                </div>
                    </section>
                <section id = "${this.#parentForForm}-section-select-id" class = "section-search">
                <div>    
                    <label  for = "${this.#parentForForm}-genres-id">Genres</label>
                    <select class = "select-input" id = "${this.#parentForForm}-genres-id"></select>
                </div>
                    <div>
                    <label  for = "${this.#parentForForm}-regions-id">Origin country</label>    
                    <select class = "select-input" id = "${this.#parentForForm}-regions-id"></select>
                </div>
                </section>
                <section id = "${this.#parentForForm}-section-selected-id" class = "selected-section-search">
                    <textarea  class = "selected-place" name = "genres" id = "${this.#parentForForm}-input-genres-id" placeholder = "Here selected genres" readonly></textarea>
                    <textarea class = "selected-place" name = "regions" id = "${this.#parentForForm}-input-regions-id" placeholder = "Here selected region" readonly></textarea>
                </section>
                <section class = "filter-submit_section" id = "${this.#parentForForm}-submit-section-id">
                <button type = "submit">Submit</button>
                </section>
                <a id = "${this.#parentForForm}-close-search-id" class = "close-anchor" href = "#">Close details</a>
            </form>    
            </div>
        </div>` 
        
        this.#callBackSetOption(`${this.#parentForForm}`);  
        this.#setListener(); 
               
    }

    #setListener(){
        this.#setCloseEvent();
        this.#setSelectEvent();
        this.#setEventSubmit();
    }

    #setEventShowForm(){
        const buttonSearch = document.getElementById(`${this.#parentId}-btn-search-id`);
        buttonSearch.addEventListener('click',() => {
            this.#showForm();
        })
    }

    #setCloseEvent(){
        const closeAnchor = document.getElementById(`${this.#parentForForm}-close-search-id`);
        closeAnchor.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById(this.#parentForForm).hidden = true;
        });
    }
    #setSelectEvent(){
        const selectGenres = document.getElementById(`${this.#parentForForm}-genres-id`)
        const selectRegions = document.getElementById(`${this.#parentForForm}-regions-id`)
        const placeGenres = document.getElementById(`${this.#parentForForm}-input-genres-id`)
        const placeRegions= document.getElementById(`${this.#parentForForm}-input-regions-id`)
        
        selectGenres.addEventListener('change',() => { 
            if(!placeGenres.value.includes(selectGenres.value)){
                placeGenres.value += placeGenres.value == '' ? `${selectGenres.value}` :`,${selectGenres.value}`
            }else {
                alert(`${selectGenres.value} already exists in the list`)
            } 
        })

        selectRegions.addEventListener('change',() => {
        
            if(!placeRegions.value.includes(selectRegions.value)){
                placeRegions.value += placeRegions.value == '' ? `${selectRegions.value}` : `,${selectRegions.value}`
            }else {
                alert(`${selectRegions.value} already exists in the list`)
            }  
        
        })
    }

    setOptionsForSearch(element, options, placeHolder){
        element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
        element.innerHTML += options.map(option => `<option value = "${option}">${option}</option>`).join(''); 
    }

    #setEventSubmit(){
        const formElement = document.getElementById(`${this.#parentForForm}-form-search-id`);

        formElement.addEventListener('submit',(event) => {
            event.preventDefault()
            const formData = new FormData(formElement);
            this.#searchObject.language = formData.get('language-movie')
            this.#searchObject.year = formData.get('year-movie')
            this.#searchObject.genres = formData.get('genres').split(',')
            this.#searchObject.regions = formData.get('regions').split(',')

            this.#callbackSearchFn(this.#searchObject);
            document.getElementById(this.#parentForForm).hidden = true;

        })

    }

  

}

