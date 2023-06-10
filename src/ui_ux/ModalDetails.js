export default class ModalDetails{

    #parentId;
    #callbackFn;
    #active_user;
    #idMovie;

    constructor(parentId, callbackFn){
        this.#parentId = parentId;
        this.#callbackFn = callbackFn;
    }

    openWindow(idMovie,name,array,text,imagePath,titles,active_user){
        this.#idMovie = idMovie;
        this.#active_user = active_user;
        let statusCheckBox = this.#checkStatus();
        const parentElement = document.getElementById(this.#parentId)
        parentElement.innerHTML = 
                            `<div id = "modalBackground">
                                    <div class="modal-window">
                                        <img src = "${imagePath}" class = "details-image">
                                    <div class = "information-details">
                                        <p class = "title-movie-details">${name}</p>
                                    <table id = "${this.#parentId}-table-details-id">
                                        <tbody id = "${this.#parentId}-table-details-body-id">
                                        ${this.#fillTable(array,titles)}    
                                        </tbody>
                                    <table>
                                    <p class = "overview-details">${text}</p>
                                    <section id = "${this.#parentId}-check-section-id" class = "check-details-section">
                                        <input id = "${this.#parentId}-check-watch-id" type = "checkbox" value = "watch" ${statusCheckBox[0] ? "checked" : ""}>
                                        <Label for = "${this.#parentId}-check-watch-id">movie watched</label>
                                        <input id = "${this.#parentId}-check-favorite-id" type = "checkbox" value = "favorite" ${statusCheckBox[1] ? "checked" : ""}>
                                        <Label for = "${this.#parentId}-check-favorite-id">favorit movie</label>
                                    </section>
                                    <a id = "${this.#parentId}-close-details-id" class = "close-anchor" href = "#">Close details</a>
                                    </div>
                                    </div>
                            </div>`
        parentElement.hidden = false;
        this.#setEventListener();
    }

    #checkStatus(){

        let res = [false,false];
        if(this.#active_user != undefined){
            if(this.#active_user.watches.includes(this.#idMovie)){
                res[0] = true;  
            }
            if(this.#active_user.favorites.includes(this.#idMovie)){
                res[1] = true;  
            }
        }
            
        return res;
    }


    #setEventListener(){
        this.#setCloseEvent();
        this.#setEventCheckWatch()
        this.#setEventCheckFavorites()
    }

    #setEventCheckWatch(){
        const checkWatch = document.getElementById(`${this.#parentId}-check-watch-id`);
        checkWatch.addEventListener('click',() => {
            this.#callbackFn(checkWatch.checked,checkWatch.value, this.#idMovie);
        })
    }

    #setEventCheckFavorites(){
        const checkFavor = document.getElementById(`${this.#parentId}-check-favorite-id`);
        checkFavor.addEventListener('click',() => {
            this.#callbackFn(checkFavor.checked,checkFavor.value, this.#idMovie);
        })
    }

    #setCloseEvent() {
        const closeAnchor = document.getElementById(`${this.#parentId}-close-details-id`);
        closeAnchor.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById(this.#parentId).hidden = true;
        });
    }

    #fillTable(array,titles){
        return array.map((element,index) => `<tr class = "row-details">
                                                    <td class = "title_details">${titles[index]}</td>
                                                    <td class = "element-details">${element}</td>
                                                </tr>`).join('');
    }

    

}