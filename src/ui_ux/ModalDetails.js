export default class ModalDetails{

    #parentId;

    constructor(parentId){
        this.#parentId = parentId;
    }

    openWindow(name,array,text,imagePath,titles){
        const parentElement = document.getElementById(this.#parentId)

        parentElement.innerHTML = 
                            `<div id = "modalBackground">
                                    <div class="modal-window">
                                    <img src = "${imagePath}" class = "details-image">
                                    <div class = "information-details">
                                    <p class = "title-movie-details">${name}</p>
                                    <table id = "${this.#parentId}-table-details-id">
                                        <tbody id = "${this.#parentId}-table-details-body-id">
                                        ${this.#fillTaable(array,titles)}    
                                        </tbody>
                                    <table>
                                    <p class = "overview-details">${text}</p>
                                    </div>
                                    </div>
                            </div>`
        parentElement.hidden = false;
        this.#setEventListener();
    }

    #setEventListener(){
        const background = document.getElementById('modalBackground')
        background.addEventListener('click',() => {
            document.getElementById(this.#parentId).hidden = true; 
        })
    }

    #fillTaable(array,titles){
        return array.map((element,index) => `<tr class = "row-details">
                                                    <td class = "title_details">${titles[index]}</td>
                                                    <td class = "element-details">${element}</td>
                                                </tr>`).join('');
    }

    

}