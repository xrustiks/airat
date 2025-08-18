// Update the year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission handling
const form = document.getElementById('request-form');
const msg = document.getElementById('form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.name || !data.phone) {
    msg.textContent = 'Fill all fields';
    return;
  }
  msg.textContent = 'Application submitted. We will call you back.';
  form.reset();
});

// Image gallery interaction
const images = document.querySelectorAll('.machine-images img');

images.forEach(img => {
  img.addEventListener('hover', () => {
    images.forEach(i => i.classList.remove('active', 'dimmed'));
    img.classList.add('active');
    images.forEach(i => {
      if (i !== img) i.classList.add('dimmed');
    });
  });
});