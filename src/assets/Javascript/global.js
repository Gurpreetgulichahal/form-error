function GlobalQuestionBankFunction() {
    // alert("Hello I am Global Question bank");
    let mainDivElement = document.getElementById("MainContainer");
    let globalDivElement = document.getElementById("GlobalContainer");
    mainDivElement.style.width = "70%";
    globalDivElement.style.display = "block";
    let personalDivElement = document.getElementById("MainPersonalContainer");
    personalDivElement.style.display = "none";
    document.getElementById("formsImage").style.display = "none";
}

function CloseQuestionBank() {
    let closeElement = document.getElementById("GlobalContainer")
    let mainDivElement = document.getElementById("MainContainer");
    closeElement.style.display = "none";
    mainDivElement.style.width = "100%";
}

function PersonalQuestionBankFunction() {
    let mainDivElement = document.getElementById("MainContainer");
    let personalDivElement = document.getElementById("MainPersonalContainer");
    let globalDivElement = document.getElementById("GlobalContainer");
    mainDivElement.style.width = "70%";
    globalDivElement.style.display = "none";
    personalDivElement.style.display = "block";
    document.getElementById("formsImage").style.display = "none";

}


function closePersonalQuestionBank() {
    let closePersonalElement = document.getElementById("MainPersonalContainer");
    let mainDivElement = document.getElementById("MainContainer");
    closePersonalElement.style.display = "none";
    mainDivElement.style.width = "100%";
}

var state = false
function passwordVisible() {
    console.log("visible");
    if (state) {
        document.getElementById("password").setAttribute("type", "password");
        document.getElementById("eye").style.color = '#7a797e';
        state = false;
    } else {
        document.getElementById("password").setAttribute("type", "text");
        document.getElementById("eye").style.color = '#5887ef';
        state = true;
    }
}

function validate() {
    console.log("passwordStreangth")
    var pass = document.getElementById("password");
    var upper = document.getElementById("upper");
    var sp_char = document.getElementById("special_char");
    var lower = document.getElementById("lower");
    var num = document.getElementById("number");
    var len = document.getElementById("length");
    if (pass.value.match(/[0-9]/)) {
        num.style.color = 'green';
    } else {
        num.style.color = 'red';
    }
    if (pass.value.match(/[A-Z]/)) {
        upper.style.color = 'green';
    } else {
        upper.style.color = 'red';
    }
    if (pass.value.match(/[a-z]/)) {
        lower.style.color = 'green';
    } else {
        lower.style.color = 'red';
    }
    if (pass.value.match(/[!\@\#\$\%\^\&\*\_\+\-\+\?\>\<\.\,]/)) {
        sp_char.style.color = 'green';
    } else {
        sp_char.style.color = 'red';
    }
    if (pass.value.length < 8) {
        len.style.color = 'red';
    } else {
        len.style.color = 'green';
    }
}

const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('id_password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

