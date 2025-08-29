// Update the year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form submission handling
const form = document.getElementById('request-form');
const msg = document.getElementById('form-msg');

form.addEventListener('submit', async e => {
  e.preventDefault();
  // Converts form data to JSON
  const data = Object.fromEntries(new FormData(form));

  if (!data.name || !data.phone) {
    msg.textContent = 'Fill all fields';
    msg.style.color = 'red';
    return;
  }

  try {
    const res = await fetch('/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    msg.textContent = await res.text();
    msg.style.color = 'green';
    form.reset();
  } catch {
    msg.textContent = 'Sending error';
    msg.style.color = 'red';
  }
});
