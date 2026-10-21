const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});

let bagCount = 0;
const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    bagCount += 1;
    showToast(`${button.dataset.name} added to your bag · ${bagCount} item${bagCount === 1 ? '' : 's'} selected`);
  });
});
document.querySelectorAll('.quick-view').forEach(button => {
  button.addEventListener('click', () => showToast(`${button.dataset.product} · Select “Add to bag” to begin your order.`));
});

document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  document.querySelector('.form-message').textContent = `Thanks for your interest! ${email} has been added to this demo signup.`;
  event.target.reset();
});
