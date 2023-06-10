export default class Registration{

    #parentId;
    #parentForForm;
    #btnLogIn;
    #btnLogOut
    #callbackFnReg;
    #callbackFnLogIn;
    #callbackFnOut;
    #dataObject

    constructor(parentId,parentForForm,callbackFnReg,callbackFnLogIn,callbackFnOut,active_user){
        this.#dataObject = {};
        this.#parentId = parentId;
        this.#callbackFnReg = callbackFnReg;
        this.#callbackFnLogIn = callbackFnLogIn;
        this.#parentForForm = parentForForm;
        this.#callbackFnOut = callbackFnOut;
        this.#setMainButtons(this.#parentId,active_user);
        this.#setListener()
    }

    #setMainButtons(parentId,active_user) {
        const parentElement = document.getElementById(parentId)
        parentElement.innerHTML =
            `<section class = "login-buttons">
                <button id = "${this.#parentId}-login-id" class = "signin-signout" hidden>LogIn</<button>
                <button id = "${this.#parentId}-logout-id" class = "signin-signout" hidden>LogOut</<button>
            </section>
            <section id = "${this.#parentId}-welcome-grope-id" class = welcome-groupe>
                <p>Welcome ${active_user != undefined ? active_user.username: "to movie database"}<p>
            </section>`;
        this.#btnLogIn = document.getElementById(`${this.#parentId}-login-id`)
        this.#btnLogOut = document.getElementById(`${this.#parentId}-logout-id`)
        
        if(active_user != undefined){
            this.#btnLogOut.hidden = false;
        } else {
            this.#btnLogIn.hidden = false;  
        }
        
    }

    #setListener(){
        this.#btnLogIn.addEventListener('click',() => {
            this.showForm()
        }) 
        this.#btnLogOut.addEventListener('click', () => {
            this.#callbackFnOut()
        })

    }

    showForm(){
        const parentElement = document.getElementById(this.#parentForForm);
        parentElement.innerHTML = this.#createLoginForm();
        parentElement.hidden = false;
        this.#setFormLogInListener();
    }

    #createLoginForm(){
        const form = `<div id = "modalBackground">
        <div class="modal-window-login">
        <form id = "${this.#parentId}-form-login-id" class = "login-form">
            <H1 id = "${this.#parentId}-title-form-id">LogIn</H1>
            <section id = "${this.#parentId}-check-user-id" class = "input-section">
                <input id = "${this.#parentId}-username-id" name = "user-name" class = "input-registration" placeholder = "Enter user name">
                <label for="${this.#parentId}-username-id">User name</label>
                <input id = "${this.#parentId}-password-id" type="password" name = "password" class = "input-registration" placeholder = "Enter password">
                <label for="${this.#parentId}-password-id">Password</label>
            </section>
            <section>
                <a id = "${this.#parentId}-new-registration-id" href = "#">New registration</a>
            </section>
            <section>
                <button id = "${this.#parentId}-btn-login-id" class = "button-login">LogIn</button>
            </section>              
            <a id = "${this.#parentId}-close-form" href = "#" class = "close-anchor" >Close form</a>
        </div>
    </div>
    </form>`        
    return form;       
    }

    #createRegistrationForm(){
        const form = `<div id = "modalBackground">
        <div class="modal-window-login">
        <form id = "${this.#parentId}-form-registration-id">
            <H1 id = "${this.#parentId}-title-form-id">New registration</H1>
            <section id = "${this.#parentId}-new-user-id" class = "input-section"> 
                <input id "${this.#parentId}-new-username-id" name = "new-user-name" class = "input-registration" placeholder = "Enter new user name">
                <label for="${this.#parentId}-new-username-id">User name</label>
                <input id = ""${this.#parentId}-new-password-id type="password" name = "new-password" class = "input-registration" placeholder = "Enter new password">
                <label for="${this.#parentId}-new-password-id">Password</label>
                <section>
                    <a id = "${this.#parentId}-back-id" href = "#" >Back</a>
                </section>
                <section>
                <button type = "submit" id = "${this.#parentId}-btn-submit-id" class = "button-login">Registration</button>
                </section>
            </section>   
            <a id = "${this.#parentId}-close-form" href = "#" >Close form</a>
        </div>
    </div>
    </form>`       
    return form;       
    }

//events initialization

    #setFormLogInListener(){
        const closeButton = document.getElementById(`${this.#parentId}-close-form`)
            this.#setEventClose(closeButton);
        const anchorNewReg = document.getElementById(`${this.#parentId}-new-registration-id`)
            this.#setEventRegistrationForm(anchorNewReg);
        const formLogIn = document.getElementById(`${this.#parentId}-form-login-id`)
            this.#setEventCheckUser(formLogIn);
    }

    #setFormRegistrationListener(){
        const closeButton = document.getElementById(`${this.#parentId}-close-form`)
            this.#setEventClose(closeButton);
        const anchorBack = document.getElementById(`${this.#parentId}-back-id`)
            this.#setEventBackToCheck(anchorBack);
        const formRegistration = document.getElementById(`${this.#parentId}-form-registration-id`)
            this.#setEventRegistration(formRegistration);
    }
//=====================================

//events of LogIn 
    #setEventCheckUser(formLogIn) {
        formLogIn.addEventListener('submit', async (event) => {
                event.preventDefault();
                this.#userFromLogInForm(formLogIn);
                const user = await this.#callbackFnLogIn(this.#dataObject);
                if(user[0] != undefined){
                    alert(`Welcome ${user[0].username}`)
                    document.getElementById(this.#parentForForm).hidden = true;
                }
        
        });
    }

    #setEventRegistrationForm(anchorNewReg) {
        anchorNewReg.addEventListener('click', (event) => {
            event.preventDefault();
            const parentElement = document.getElementById(this.#parentForForm);
            parentElement.innerHTML = this.#createRegistrationForm()
            parentElement.hidden = false;
            this.#setFormRegistrationListener();
        });
    }
//=====================================

//event of Registration form
    #setEventRegistration(formRegistration) {
        formRegistration.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.#userFromRegForm(formRegistration);
            const newUser = await this.#callbackFnReg(this.#dataObject);
            if(newUser != undefined){
                await this.#callbackFnLogIn(newUser);
                alert(`Welcome ${newUser.username}`)
                document.getElementById(this.#parentForForm).hidden = true;
            }
            
        });
    }

    #setEventBackToCheck(anchorBack) {
        anchorBack.addEventListener('click', (event) => {
            event.preventDefault();
            this.showForm();
        });
    }
//=====================================

//events of all forms
    #setEventClose(closeButton) {
        closeButton.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById(this.#parentForForm).hidden = true;
        });
    }
//=====================================

// geting object from form

    #userFromRegForm(formRegistration) {
        const formData = new FormData(formRegistration);
        this.#dataObject.username = formData.get('new-user-name');
        this.#dataObject.password = formData.get('new-password');
        this.#dataObject.watches = [];
        this.#dataObject.favorites = [];
    }

    #userFromLogInForm(formLogIn) {
        const formData = new FormData(formLogIn);
        this.#dataObject.username = formData.get('user-name');
        this.#dataObject.password = formData.get('password');
    }
//=====================================

//public methosds
closeForm(){

}
}