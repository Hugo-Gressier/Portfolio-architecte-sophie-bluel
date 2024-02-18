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
            figure.className = work.categoryId
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

/*Affichage des travaux en fonction du filtre sélectionné*/

/*Initialisation des différents boutons*/

const filtreBouton = document.querySelectorAll('.filtre__bouton')

filtreBouton.forEach(bouton => {
    bouton.addEventListener('click', function() {
        filtreBouton.forEach(b => b.classList.remove('filtre__bouton--selected'))

        bouton.classList.add('filtre__bouton--selected')

        if (bouton.id === 'objets') {
            selectionFiltre('1')
        } else if (bouton.id === 'appartements') {
            selectionFiltre('2')
        } else if (bouton.id === 'hotels_restaurants') {
            selectionFiltre('3')
        } else if (bouton.id === 'tous') {
            retirerFiltre()
        }
    })
})

/*Fonction permettant d'afficher/cacher les photos*/

function selectionFiltre(n) {
    const sansFiltre = document.querySelectorAll('.gallery figure')
    sansFiltre.forEach(filtre => {
        if (!filtre.classList.contains(n)) {
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