// Envoie du formulaire de connexion

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault()

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const login = document.getElementById('login')
let loginError = document.querySelector('.error-login')

const email = emailInput.value
const password = passwordInput.value

if (!email || !password) {
    if (!loginError) {
        loginError = document.createElement('div')
        loginError.className = 'error-login'
        login.insertBefore(loginError, loginForm)
    }
    loginError.textContent = 'Veuillez renseigner tous les champs'
    return
}

const loginUrl = 'http://localhost:5678/api/users/login'

// Affichage des erreurs et récupération du token

fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
})
.then(res => {
    if (!res.ok) {
        throw new Error('Les identifiants sont incorrects')
    }
    return res.json()
})
.then(data => {
    const token = data.token
    if (!token) {
        throw new Error('Token manquant')
    }
    localStorage.setItem('token', token)
    window.location.href = "index.html"
})
.catch(error => {
    console.error(error)
    if (!loginError) {
        loginError = document.createElement('div')
        loginError.className = 'error-login'
        login.insertBefore(loginError, loginForm)
    }
    loginError.textContent = error.message

    emailInput.classList.add('error-border')
    passwordInput.classList.add('error-border')
})
})