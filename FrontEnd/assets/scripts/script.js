// Récupération des travaux depuis le back-en

const gallery = document.querySelector(".gallery")
const workUrl = 'http://localhost:5678/api/works'
const modalContent = document.querySelector('.modal-content')

fetch(workUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('erreur')
        }
        return res.json()
    })
    .then(data => {
        showMiniature(data)
        showGallery(data)
    })
    .catch(error => {
        console.log(error)
    })

    function showGallery(works) {
        while (gallery.firstChild) {
          gallery.removeChild(gallery.firstChild)
        }
      
        works.forEach(work => {
          const figure = document.createElement('figure')
          const img = document.createElement('img')
          figure.dataset.id = work.categoryId
          img.src = work.imageUrl
          img.alt = work.title
          const figcaption = document.createElement('figcaption')
          figcaption.textContent = work.title
      
          figure.appendChild(img)
          figure.appendChild(figcaption)
          gallery.appendChild(figure)
        })
      
        showMiniature(works)
    }

// Initialisation des différents boutons

const categoriesUrl = 'http://localhost:5678/api/categories'

fetch(categoriesUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('erreur')
        }
        return res.json()
    })

    .then(data => {
        const filters = document.querySelector('.filter')
        const buttonAll = document.createElement('button')
        buttonAll.innerHTML = 'Tous'
        buttonAll.className = 'filter-button filter-button-selected'
        buttonAll.addEventListener('click', function() {
        filterRemove()
        buttonSelected(buttonAll)
    })
    filters.appendChild(buttonAll)
        data.forEach(categories => {
            const buttonFilter = document.createElement('button')
            buttonFilter.innerHTML = categories.name
            buttonFilter.id = categories.id
            buttonFilter.className = 'filter-button'
            buttonFilter.addEventListener('click', function() {
                filterSelection(categories.id)
                buttonSelected(buttonFilter)
            })
            filters.appendChild(buttonFilter)
        })
    })

    .catch(error => {
        console.log(error)
    })

// Fonction permettant d'afficher/cacher les photos

function filterSelection(n) {
    const applyFilters = document.querySelectorAll('.gallery figure')
    applyFilters.forEach(filter => {
        const filterId = filter.dataset.id
        if (filterId != n) {
            filter.classList.add('hidden')
        } else {
            filter.classList.remove('hidden')
        }
    })
}


// Fonction permettant d'afficher toutes les photos

function filterRemove () {
    const noFilter = document.querySelectorAll('.gallery figure')
    noFilter.forEach(filter => {
        filter.classList.remove('hidden')
    })
}

// Fonction permettant d'ajouter la classe "filter-button-selected"

function buttonSelected(buttonFilter) {
    const buttonSelect = document.querySelector('.filter-button-selected')
    if (buttonSelect) {
        buttonSelect.classList.remove('filter-button-selected')
    }
    buttonFilter.classList.add('filter-button-selected')
}