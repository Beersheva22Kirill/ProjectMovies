export default class Search {

    #parentId;
    #object;
    #callback;

    constructor (parentId,callback){
        this.#callback = callback;
        this.#parentId = parentId;
        this.#object = {};
        this.#createElement()
    }

    #createElement(){
        const parent = document.getElementById(this.#parentId)

        parent.innerHTML = `
        <section>
            <form id = "${this.#parentId}-form-search-id">
                <input class = "input-search-movie" type = "text" name = "name-movie" placeholder = "Search...">
            <form>
        </section>`
        this.#setListener()
    }

    #setListener(){
        const formElement = document.getElementById(`${this.#parentId}-form-search-id`)

        formElement.addEventListener('submit',(event) => {
            event.preventDefault();
            const formData = new FormData(formElement);
            this.#object.string_name = formData.get('name-movie')
            this.#callback(this.#object);
        })
    }
}