function LogIn() {
    const formValues = document.querySelector('#loginForm');

    formValues.addEventListener('submit', async function(event){
        event.preventDefault();

        // Récupération des input
        const loginValue = {
            email: event.target.querySelector('[name=e-mail]').value,
            password: event.target.querySelector('[name= password]').value,
        }

        // Création charge utile au format JSON
        const chargeUtile = JSON.stringify(loginValue);
        
        const reponse= await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: chargeUtile,
        });

        //Stokage de la réponse dans constante
        const user = await reponse.json();
        if (user.userId) {
            window.localStorage.setItem("userId", user.userId);
            window.localStorage.setItem('token', user.token);

            location.href='./index.html';
        }else {
            const loginError = document.querySelector('.loginError');
            loginError.classList.remove('hidden');

            const loginErrorBtn = document.getElementById('loginErrorBtn');
            loginErrorBtn.addEventListener('click', function(){
                loginError.classList.add('hidden');
            });
        };
    });
};

LogIn();