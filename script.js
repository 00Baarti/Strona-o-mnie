document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth' });
    setActiveNavLink(link);
  });
});

function setActiveNavLink(activeLink) {
  document.querySelectorAll('a.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}

setActiveNavLink(document.querySelector('a.nav-link'));

const darkModeToggle = document.getElementById('darkModeToggle');

function applyDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
  }
}

darkModeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
  applyDarkMode(isDark);
});

window.addEventListener('load', () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(darkMode);
});

const faders = document.querySelectorAll('.fade-in');
const options = { threshold: 0.3 };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.animationPlayState = 'running';
    observer.unobserve(entry.target);
  });
}, options);

faders.forEach(fader => {
  fader.style.animationPlayState = 'paused';
  appearOnScroll.observe(fader);
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  let valid = true;

  if (name.length < 2) {
    showError(contactForm.name, 'Podaj co najmniej 2 znaki');
    valid = false;
  }
  if (!validateEmail(email)) {
    showError(contactForm.email, 'Niepoprawny email');
    valid = false;
  }
  if (message.length < 10) {
    showError(contactForm.message, 'Wiadomość musi mieć co najmniej 10 znaków');
    valid = false;
  }

  if (!valid) return;

  formMessage.textContent = 'Dziękuję za wiadomość! Wkrótce się skontaktuję.';
  contactForm.reset();
});

function showError(inputElem, message) {
  const errorElem = inputElem.nextElementSibling;
  errorElem.textContent = message;
  inputElem.classList.add('error');
}

function clearErrors() {
  contactForm.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
