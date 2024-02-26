document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault()

const email = document.getElementById('email').value
const password = document.getElementById('password').value

const loginUrl = 'http://localhost:5678/api/users/login'

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
        throw new Error('erreur')
    }
    return res.json()
})
.then(data => {
    const token = data.token
    console.log(token)
})
.catch(error => {
    console.error(error)
})
})