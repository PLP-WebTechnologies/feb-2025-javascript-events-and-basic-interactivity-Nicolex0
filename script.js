// Event Handling
const magicButton = document.getElementById('magic-button');
const buttonMessage = document.getElementById('button-message');
let clickCount = 0;

magicButton.addEventListener('click', () => {
    clickCount++;
    magicButton.style.backgroundColor = `hsl(${clickCount * 60 % 360}, 70%, 50%)`;
    buttonMessage.textContent = `Clicked ${clickCount} times!`;
});

magicButton.addEventListener('mouseover', () => {
    buttonMessage.textContent = 'Hovering... Try clicking or double-clicking!';
});

magicButton.addEventListener('mouseout', () => {
    buttonMessage.textContent = `Interact with the button above! (Clicked ${clickCount} times)`;
});

magicButton.addEventListener('dblclick', () => {
    buttonMessage.textContent = 'Secret Double-Click Action! 🎉';
    magicButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
        magicButton.style.transform = 'scale(1)';
    }, 300);
});

// Long press detection
let pressTimer;
magicButton.addEventListener('mousedown', () => {
    pressTimer = setTimeout(() => {
        buttonMessage.textContent = 'Long Press Detected! 🕒';
        magicButton.style.backgroundColor = '#ff4444';
    }, 1000);
});
magicButton.addEventListener('mouseup', () => clearTimeout(pressTimer));
magicButton.addEventListener('mouseleave', () => clearTimeout(pressTimer));

// Keypress detection (Enter key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement === magicButton) {
        buttonMessage.textContent = 'Enter key pressed! 🚀';
    }
});

// Slideshow
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Form Validation
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = 'Invalid email format';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Password validation
    if (!passwordInput.value) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    } else if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
}

// Real-time feedback
nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
        nameError.textContent = '';
    } else {
        nameError.textContent = 'Name is required';
    }
});

emailInput.addEventListener('input', () => {
    if (validateEmail(emailInput.value)) {
        emailError.textContent = '';
    } else {
        emailError.textContent = emailInput.value ? 'Invalid email format' : 'Email is required';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length >= 8) {
        passwordError.textContent = '';
    } else {
        passwordError.textContent = passwordInput.value ? 'Password must be at least 8 characters' : 'Password is required';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
        form.reset();
    }
});