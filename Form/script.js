const form = document.getElementById('validation-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit-button');

// Validation function
function validateField(input, validationFn, errorMessage) {
  const errorElement = input.nextElementSibling;
  if (validationFn(input.value)) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorElement.style.display = 'none';
    return true;
  } else {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    return false;
  }
}

// Specific validations
function isNameValid(name) {
  return name.trim().length >= 3;
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isPhoneValid(phone) {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Real time validation
nameInput.addEventListener('input', () => {
  validateField(nameInput, isNameValid, 'El nombre debe tener al menos 3 caracteres.');
  toggleSubmitButton();
});
emailInput.addEventListener('input', () => {
  validateField(emailInput, isEmailValid, 'Ingresa un correo válido.');
  toggleSubmitButton();
});
phoneInput.addEventListener('input', () => {
  validateField(phoneInput, isPhoneValid, 'El número debe tener entre 10 y 15 dígitos.');
  toggleSubmitButton();
});

// Function to toggle submit button state
function toggleSubmitButton() {
  const isFormValid = 
    isNameValid(nameInput.value) &&
    isEmailValid(emailInput.value) &&
    isPhoneValid(phoneInput.value);
  
  submitButton.disabled = !isFormValid;
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Avoid sendind the default form
});