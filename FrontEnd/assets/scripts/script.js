/*Récupération des travaux depuis le back-en*/

const gallery = document.querySelector(".gallery")
const work = ('http://localhost:5678/api/works')

for(let i = 0; i < 11; i++) {
    let figure = document.createElement('figure')
    gallery.appendChild(figure)
    let photo = document.createElement('img')
    let figcaption = document.createElement('figcaption')
    figure.appendChild(photo)
    figure.appendChild(figcaption)

    fetch(work)
        .then(res => {
            if (!res.ok) {
                throw new Error('erreur')
            }
            return res.json()
        })
        
        .then(data => {
            figure.id = data[i].categoryId
             photo.src = data[i].imageUrl
             photo.alt = data[i].title
             figcaption.innerHTML = data[i].title
             console.log(data)
        })
}