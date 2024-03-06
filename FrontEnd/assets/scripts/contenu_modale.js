const modalContenu = document.querySelector('.contenu__modale')

fetch(workUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error('erreur')
        }
        return res.json()
    })

    .then(data => {
        data.forEach(work => {
            const miniature = document.createElement('div')
            miniature.className = 'miniature'
            const img = document.createElement('img')
            img.src = work.imageUrl
            img.position = 'relative'
            const supprimer = document.createElement('a')
            supprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
            supprimer.className = 'bouton_supp'
            supprimer.id = work.id

            miniature.appendChild(img)
            miniature.appendChild(supprimer)
            modalContenu.appendChild(miniature)
            console.log(data)
        })
    })
    .catch(error => {
        console.log(error)
    })