// Fonction permettant d'afficher les travaux en miniature et de les supprimer

function showMiniature(works) {
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild)
  }

  works.forEach(work => {
    const miniature = document.createElement('div')
    miniature.className = 'miniature'
    const img = document.createElement('img')
    img.src = work.imageUrl
    img.style.position = 'relative'
    const deleteButton = document.createElement('a')
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
    deleteButton.className = 'delete-button'
    deleteButton.id = work.id

    miniature.appendChild(img)
    miniature.appendChild(deleteButton)
    modalContent.appendChild(miniature)

    deleteButton.addEventListener('click', async function(event) {
      event.preventDefault()
      const id = this.id

      try {
        const res = await fetch(`${workUrl}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error('erreur')
        }

        miniature.remove()

        const workRes = await fetch(workUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const works = await workRes.json()

        showMiniature(works)
        showGallery(works)
      } catch (error) {
        console.log(error)
      }
    })
  })
}

const buttonBack = document.querySelector('.modal-back')
const modalButton = document.querySelector('.modal-content-button')
const modalTitle = document.querySelector('#modal-title')
const portfolioForm = document.querySelector('.portfolio-form')

// Bouton pour afficher le formulaire

modalButton.addEventListener('click', function() {
  buttonBack.classList.remove('hidden')
  modalContent.classList.add('hidden')
  modalButton.classList.add('hidden')
  portfolioForm.classList.remove('hidden')

  modalTitle.innerHTML = 'Ajout photo'
})

// Bouton pour revenir aux miniatures

buttonBack.addEventListener('click', function() {
  buttonBack.classList.add('hidden')
  modalContent.classList.remove('hidden')
  modalButton.classList.remove('hidden')
  portfolioForm.classList.add('hidden')
  modalTitle.innerHTML = 'Ajout photo'
})

// Envoie du formulaire

document.getElementById('portfolio-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append('title', document.getElementById('title').value)
  formData.append('category', document.getElementById('category').value)
  const imageInput = document.getElementById('image')
  const imageFile = imageInput.files[0]
  formData.append('image', imageFile)

  const form = document.getElementById('portfolio-form')
  if (!form.checkValidity()) {
    const submitButton = document.getElementById('submit-button')
    submitButton.classList.add('input-invalid')
    return
  }

  try {
    const res = await fetch(workUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error('erreur')
    }

    e.target.reset()
    const imagePreview = document.getElementById('image-preview')
    imagePreview.style.backgroundImage = ""
    submitButton.classList.add('input-invalid')

    const responseData = await fetch(workUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const works = await responseData.json()

    showMiniature(works)
    showGallery(works)
  } catch (error) {
    console.log(error)
  }
})

const form = document.getElementById('portfolio-form')
const submitButton = document.getElementById('submit-button')

// Changement du background du submit en fonction de la validité du formulaire

form.addEventListener('input', () => {
  if (form.checkValidity()) {
    submitButton.classList.remove('input-invalid')
  } else {
    submitButton.classList.add('input-invalid')
  }
})

// Fonction permettant de récupérer les catégories

async function fetchCategories() {

  if (!token) {
    return
  }

  try {
    const res = await fetch(categoriesUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error('erreur')
    }

    const categories = await res.json()
    const select = document.getElementById('category')

    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.textContent = ''
    select.appendChild(defaultOption)

    categories.forEach((category) => {
      const option = document.createElement('option')
      option.value = category.id
      option.textContent = category.name
      select.appendChild(option)
    })
  } catch (error) {
    console.log(error)
  }
}

fetchCategories()

const imageInput = document.getElementById('image')
imageInput.addEventListener('change', previewImage)

// Fonction permettant de voir l'image envoyée dans le formulaire

function previewImage(event) {
  const file = event.target.files[0]

  // Ajout de la vérification du fichier sélectionné via le click

  const authorizedFiles = ['image/jpeg', 'image/png']

  if (!authorizedFiles.includes(file.type)) {
    alert("Le fichier sélectionné n'est pas une image")
    imageInput.value = ''
    submitButton.classList.add('input-invalid')
    return
  }

  const reader = new FileReader()

  reader.onload = function(event) {
    const imagePreview = document.getElementById('image-preview')
    imagePreview.style.backgroundImage = `url(${event.target.result})`
  }

  reader.readAsDataURL(file)
}

// Ajout du glisser-déposer

const dropZone = document.querySelector('.form-image')

dropZone.addEventListener('dragenter', function(event) {
  event.preventDefault()
})

dropZone.addEventListener('dragover', function(event) {
  event.preventDefault()
  dropZone.classList.add('drag-over')
})

dropZone.addEventListener('dragleave', function(event) {
  dropZone.classList.remove('drag-over')
})

dropZone.addEventListener('drop', function(event) {
  event.preventDefault()
  dropZone.classList.remove('drag-over')

  const files = event.dataTransfer.files
  const imageInput = document.getElementById('image')
  imageInput.files = files

  handleFiles(imageInput)
})

function handleFiles(input) {
  const files = input.files
  const imagePreview = document.getElementById('image-preview')

  // Ajout de la vérification du fichier sélectionné via le glisser-déposer

  const authorizedFiles = ['image/jpeg', 'image/png']

  for (const file of files) {
    
    if (!authorizedFiles.includes(file.type)) {
      alert("Le fichier sélectionné n'est pas une image")
      imageInput.value = ''
      submitButton.classList.add('input-invalid')
      return
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = function(event) {
        imagePreview.style.backgroundImage = `url(${event.target.result})`
      }
      reader.readAsDataURL(file)
    }
  }
}