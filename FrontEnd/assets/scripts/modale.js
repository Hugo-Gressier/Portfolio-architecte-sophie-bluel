// Vérification du token de connexion et modification de la page en conséquence

const token = localStorage.getItem('token')

if (token) {
    const editMode = document.createElement('div')
    editMode.className = 'edit-mode'
    editMode.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p>Mode édition</p>'
    const body = document.querySelector('body')
    const header = document.querySelector('header')
    if (header) {
        body.insertBefore(editMode, header)
    }
    
    const logout = document.querySelector('.login-button')
    logout.innerHTML = '<a href="#">logout</a>'

    logout.addEventListener('click', function() {
        localStorage.removeItem('token')
        location.reload()
    })

    const editButton = document.createElement('a')
    editButton.href = '#modal'
    editButton.className = 'modal-button'
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'

    header.classList.add('edit-margin')
    gallery.classList.add('edit-margin')

    const portfolioTitle = document.querySelector('.portfolio-title')
    portfolioTitle.appendChild(editButton)

    const hiddenButton = document.querySelector('.filter')
    hiddenButton.classList.add('hidden')
}

// Gestion du focus

let modal = null
const focusableSelector = 'button, a, input, select'
let focusables = []
let previouslyFocusedElement = null

// Ouverture de la modale

const openModal = function(e) {
    e.preventDefault()
    const href = e.target.getAttribute('href')
    const selectedModal = document.querySelector(href)
    if (selectedModal) {
        modal = selectedModal
        focusables = Array.from(modal.querySelectorAll(focusableSelector))
        previouslyFocusedElement = document.querySelector(':focus')
        modal.classList.remove('hidden')
        focusables[0].focus()
        modal.removeAttribute('aria-hidden')
        modal.setAttribute('aria-modal', 'true')
        modal.addEventListener('click', closeModal)
        modal.querySelector('.modal-close').addEventListener('click', closeModal)
        modal.querySelector('.modal-stop').addEventListener('click', stopPropagation)
    }
}

// Fermeture de la modale

const closeModal = function(e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.classList.add('hidden')
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

// Fonction permettant le focus

const focusInModal = function(e) {
    e.preventDefault()
    const focusedElement = modal.querySelector(':focus')
    if (focusedElement) {
        let index = focusables.findIndex(f => f === focusedElement)
        if (e.shiftKey === true) {
            index--
        } else {
            index++
        }
        if (index >= focusables.length) {
            index = 0
        }
        if (index < 0) {
            index = focusables.length - 1
        }
        focusables[index].focus()
    }
}

document.querySelectorAll('.modal-button').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})
