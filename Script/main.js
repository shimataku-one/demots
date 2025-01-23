const openModalButton = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');

openModalButton.onclick = function() {
  modal.style.display = 'block';
};

closeButton.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
