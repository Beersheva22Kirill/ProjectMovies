export default class Registration{

    #users;
    #service;
    #parentId;
    #parentForForm;
    #callbackFnReg;

    constructor(parentId,parentForForm,callbackFnReg,callbackFnValid){
        this.#parentId = parentId;
        this.#callbackFnReg = callbackFnReg;
        this.#parentForForm = parentForForm;
        document.getElementById(parentId).innerHTML =  `<button id = "${this.#parentId}-login-id" class = "signin-signout">LogIn</<button>
                                                        <button id = "${this.#parentId}-logout-id" class = "signin-signout" hidden>LogOut</<button>`
        this.#setListener()
    }

    #showForm(){
        const parentElement = document.getElementById(this.#parentForForm);
        parentElement.innerHTML = this.#createForm();
        parentElement.hidden = false;
        this.#setFormListener();
    }

    #createForm(){
        const form = `<div id = "modalBackground">
        <div class="modal-window-login">
            <H1>LogIn</H1>
            <section id = "${this.#parentId}-check-user-id">
                <input name = "user-name" class = "input-registration" placeholder = "Enter user name">
                <input type="password" name = "password" class = "input-registration" placeholder = "Enter password">
            </section>

            <section id = "${this.#parentId}-new-user-id" hidden> 
                <input name = "new-user-name" class = "input-registration" placeholder = "Enter new user name">
                <input type="password" name = "new-password" class = "input-registration" placeholder = "Enter new password">
            </section> 
            <a id = "${this.#parentId}-new-registration-id" href = "#">New registration</a>
            <a id = "${this.#parentId}-back-id" href = "#" hidden>Back</a>
            <button type = "submit" class = "button-login">LogIn</button>
            <a id = "${this.#parentId}-close-form" href = "#" >Close form</a>
        </div>
    </div>`        
    return form;       
    }

    #setListener(){
        const login = document.getElementById(`${this.#parentId}-login-id`);
        login.addEventListener('click',() => this.#showForm()) 

    }

    #setFormListener(){
        const closeButton = document.getElementById(`${this.#parentId}-close-form`)
        const anchorNewReg = document.getElementById(`${this.#parentId}-new-registration-id`)
        const anchorBack = document.getElementById(`${this.#parentId}-back-id`)

        closeButton.addEventListener('click',(event) => {
            event.preventDefault();
            document.getElementById(this.#parentForForm).hidden = true; 
        })

        anchorNewReg.addEventListener('click',(event) => {
            event.preventDefault();
            console.log('new');
            document.getElementById(`${this.#parentId}-check-user-id`).hidden = true;
            document.getElementById(`${this.#parentId}-new-user-id`).hidden = false; 
            document.getElementById(`${this.#parentId}-new-registration-id`).hidden = true; 
            document.getElementById(`${this.#parentId}-back-id`).hidden = false;
        })

        anchorBack.addEventListener('click',(event) => {
            event.preventDefault();
            document.getElementById(`${this.#parentId}-check-user-id`).hidden = false;
            document.getElementById(`${this.#parentId}-new-user-id`).hidden = true; 
            document.getElementById(`${this.#parentId}-new-registration-id`).hidden = false; 
            document.getElementById(`${this.#parentId}-back-id`).hidden = true;
        })
    }


}