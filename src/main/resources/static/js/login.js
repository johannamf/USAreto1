const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let isValidEmail = false;

let isValidPassword = false;

let form = document.getElementById('loginForm');



form.addEventListener('input',function (event ){
    const  formData = new FormData(form);
    const email = formData.get('inputEmail');
    const password = formData.get('inputPassword');


    isValidEmail = emailFormat.test(email);

    isValidPassword = password.length>= 6;


    if (isValidEmail){
        document.getElementById('inputEmail').classList.remove('is-invalid');
        document.getElementById('inputEmail').classList.add('is-valid');
    }else{
        document.getElementById('inputEmail').classList.add('is-invalid');
        document.getElementById('inputEmail').classList.remove('is-valid');
        document.getElementById('emailErrorMsg').innerText = 'Ingresa un E-mail valido';
    }

    if (isValidPassword){
        document.getElementById('inputPassword').classList.remove('is-invalid');
        document.getElementById('inputPassword').classList.add('is-valid');
    }else{
        document.getElementById('inputPassword').classList.add('is-invalid');
        document.getElementById('inputPassword').classList.remove('is-valid');
    }

});

form.addEventListener('submit', function (event){
    let email = document.getElementById('inputEmail').value;

    if (!form.checkValidity() || !isValidEmail || !isValidPassword ){

        console.log("No son campos validos");
        event.preventDefault();
        event.stopPropagation();
    }else{

        const email = document.getElementById('inputEmail').value;
        const passaword = document.getElementById('inputPassword').value;

        $.ajax({
            url: 'http://localhost:8080/api/use/'+email+'/'+password,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (response){
                sessionStorage.setItem('username', response.name);
            },
            error: function (){
                console.log("Error al autenticar usuario");
            }

        })
    }
});
