const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const nameLetters = /^[A-za-z]+$/;

let matchingPasswords= false;

let isValidEmail = false;

let isValidPassword = false;

let isValidName = false;

let form = document.getElementById('singupForm');

function emailExists(email){
    left_isValid = false;
    $.ajax({
        url: 'http://localhost:8080/api/user/'+email,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (response){
            isValid = Boolean(response)
        },
        error: function (){
            console.log("ERROR - No se pudo verificar el e-mail");
        }
    })
}

form.addEventListener('input',function (event ){
    const  formData = new FormData(form);
    const name =formData.get('inputName');
    const email = formData.get('inputEmail');
    const password = formData.get('inputPassword');
    const confirmPassword = formData.get('inputConfirmPassword');

    isValidName = nameLetters.test(name);

    isValidEmail = emailFormat.test(email);

    isValidPassword = password.length>= 6;

    matchingPasswords = password === confirmPassword && password !== '';

    if (isValidName){
        document.getElementById('inputName').classList.remove('is-invalid');
        document.getElementById('inputName').classList.add('is-valid');
    }else{
        document.getElementById('inputName').classList.add('is-invalid');
        document.getElementById('inputName').classList.remove('is-valid');
    }

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


    if (matchingPasswords){
        document.getElementById('inputConfirmPassword').classList.remove('is-invalid');
        document.getElementById('inputConfirmPassword').classList.add('is-valid');
    }else{
        document.getElementById('inputConfirmPassword').classList.add('is-invalid');
        document.getElementById('inputConfirmPassword').classList.remove('is-valid');
    }
});

form.addEventListener('submit', function (event){
    let email = document.getElementById('inputEmail').value;

    if (!form.checkValidity()  || !isValidName || !isValidEmail || !isValidPassword || !matchingPasswords || emailExists(email)){
        if(isValidEmail && emailExists(email)){
            document.getElementById('inputEmail').classList.add('is-invalid');
            document.getElementById('inputEmail').classList.remove('is-valid');
            document.getElementById('emailErrorMsg').innerText = 'Este E-mail ya se encuentra registrado'
        }
        console.log("No son campos validos");
        event.preventDefault();
     event.stopPropagation();
    }else{
        let datos = {
            'email': document.getElementById('inputEmail').value,
            'password': document.getElementById('inputEmail').value,
            'name': document.getElementById('inputName').value,
        }

        $.ajax({
            url: 'http://localhost:8080/api/user.new',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(datos),
            success: function (response){
                sessionStorage.setItem('username', response.name);
            },
            error: function (){
                console.log("Error al agregar usuario");
            }

        })
    }
});
