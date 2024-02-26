/*Récupération des travaux depuis le back-en*/

const gallery = document.querySelector(".gallery")
const workUrl = ('http://localhost:5678/api/works')

fetch(workUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('erreur')
        }
        return res.json()
    })

    .then(data => {
        data.forEach(work => {
            const figure = document.createElement('figure')
            figure.dataset.id = work.categoryId
            const photo = document.createElement('img')
            photo.src = work.imageUrl
            photo.alt = work.title
            const figcaption = document.createElement('figcaption')
            figcaption.innerHTML = work.title

            figure.appendChild(photo)
            figure.appendChild(figcaption)
            gallery.appendChild(figure)
        })
    })
    .catch(error => {
        console.log(error)
    })

/*Initialisation des différents boutons*/

const filtres = document.querySelector('.filtre')

const boutonTous = document.createElement('button')
boutonTous.innerHTML = 'Tous'
boutonTous.className = 'filtre__bouton filtre__bouton--selected'
boutonTous.addEventListener('click', function() {
    retirerFiltre()
    boutonSelected(boutonTous)
})
filtres.appendChild(boutonTous)

const categoriesUrl = ('http://localhost:5678/api/categories')

fetch(categoriesUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('erreur')
        }
        return res.json()
    })

    .then(data => {
        data.forEach(categories => {
            const bouton = document.createElement('button')
            bouton.innerHTML = categories.name
            bouton.id = categories.id
            bouton.className = 'filtre__bouton'
            bouton.addEventListener('click', function() {
                selectionFiltre(categories.id)
                boutonSelected(bouton)
            })
            filtres.appendChild(bouton)
        })
    })

    .catch(error => {
        console.log(error)
    })

/*Fonction permettant d'afficher/cacher les photos*/

function selectionFiltre(n) {
    const sansFiltre = document.querySelectorAll('.gallery figure')
    sansFiltre.forEach(filtre => {
        const filtreId = filtre.dataset.id;
        if (filtreId != n) {
            filtre.classList.add('hidden')
        } else {
            filtre.classList.remove('hidden')
        }
    })
}


/*Fonction permettant d'afficher toutes les photos*/

function retirerFiltre () {
    const pasDeFiltre = document.querySelectorAll('.gallery figure')
    pasDeFiltre.forEach(filtre => {
        filtre.classList.remove('hidden')
    })
}

/*Fonction permettant d'ajouter la classe "filtre__bouton--selected"*/

function boutonSelected(bouton) {
    const boutonActif = document.querySelector('.filtre__bouton--selected');
    if (boutonActif) {
        boutonActif.classList.remove('filtre__bouton--selected');
    }
    bouton.classList.add('filtre__bouton--selected');
}