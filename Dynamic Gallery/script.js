const gallery = document.getElementById('gallery');
const imageInput = document.getElementById('image-input');
const uploadForm = document.getElementById('upload-form');
const deleteAllBtn = document.getElementById('delete-all');

// handle form
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const files = imageInput.files;
  if (files.length === 0) {
    alert('Por favor selecciona al menos una imagen.');
    return;
  }

  // iterate selected files
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('image-wrapper');

      const img = document.createElement('img');
      img.src = event.target.result;
      img.alt = file.name;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.classList.add('delete-btn');

      // function to delete individual image
      deleteBtn.addEventListener('click', () => {
        wrapper.remove();
        toggleDeleteAllButton();
      });

      wrapper.appendChild(img);
      wrapper.appendChild(deleteBtn);
      gallery.appendChild(wrapper);
    };

    reader.readAsDataURL(file);
  });

  imageInput.value = '';
  toggleDeleteAllButton();
});

// function to toggle the visibility of the delete all button
function toggleDeleteAllButton() {
  deleteAllBtn.style.display = gallery.children.length > 0 ? 'block' : 'none';
}

// function for delete all the images
deleteAllBtn.addEventListener('click', () => {
  gallery.innerHTML = '';
  toggleDeleteAllButton();
});
