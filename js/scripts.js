'use strict';

const body = document.querySelector('body');

//create the search form
const searchForm = document.createElement('form');
searchForm.innerHTML = `
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;
searchForm.setAttribute('action', '#');
searchForm.setAttribute('method', 'get');
document.querySelector('.search-container').appendChild(searchForm);

//variable to store the array of users objects returned from the fetch api
let usersList;

//variable to store which card is clicked to display the modal and switch the modal
let userIndex = 0;

//declare search dom variables
const searchSubmit = document.querySelector('#search-submit');
const searchInput = document.querySelector('#search-input')
const gallery = document.querySelector('#gallery');

//listen for search inputs
searchInput.addEventListener('keyup', filterUsers);
searchSubmit.addEventListener('click', filterUsers);

//this function filters the showed users based on the search input
function filterUsers(){
  const cardDiv = document.querySelectorAll('.card');
  const names = document.querySelectorAll('.card-name');
  for(let i = 0; i < names.length; i++){
    let name = names[i].textContent;
    name.toLowerCase();
    if(!name.includes(searchInput.value.toLowerCase())){
      names[i].parentNode.parentNode.style.display = 'none';
    } else {
      names[i].parentNode.parentNode.style.display = '';
    }
  }
}

//this function removes the modal window
function removeModal(){
  const modal = document.querySelector('.modal-container');
  modal.remove();
}

//this function creates gallery items div with each user card inside and listens for clicks on cards to display the modal window
function createUsers(users){
  for(let i = 0; i < 12; i++){
    const galleryItems = document.createElement('div');
    galleryItems.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${users[i].picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${users[i].name.first} ${users[i].name.last}</h3>
        <p class="card-text">${users[i].email}</p>
        <p class="card-text cap">${users[i].location.city}</p>
      </div>`;
    galleryItems.classList.add('card');
    document.querySelector('#gallery').appendChild(galleryItems);
    galleryItems.addEventListener('click', (e) => {
      userIndex = i;
      createModal(users[i]);
    })
  }
}

//this listener listen for a click on the Prev and Next button inside the modal
//and let the user loop through the users while on the modal window
body.addEventListener('click', (e) => {
  if(e.target.textContent === 'Prev' && userIndex !== 0){
    removeModal();
    createModal(usersList[userIndex - 1]);
    userIndex--;
  }
  if(e.target.textContent === 'Next' && userIndex !== 11){
    removeModal();
    createModal(usersList[userIndex + 1]);
    userIndex++;
  }
});

//this function creates the modal window
function createModal(user){
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal-container');
  modalDiv.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${user.picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
        <p class="modal-text">${user.email}</p>
        <p class="modal-text cap">${user.location.city}</p>
        <hr>
        <p class="modal-text">${user.cell}</p>
        <p class="modal-text">${user.location.street}, ${user.location.state}, ${user.location.postcode}</p><p class="modal-text">Birthday: ${user.dob.date.substring(0, 10)}</p>
      </div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`;
  document.querySelector('body').appendChild(modalDiv);
  const closeModal = document.querySelector('#modal-close-btn');
  closeModal.addEventListener('click', (e) => {
    removeModal();
  });
}

//API url
const url = 'https://randomuser.me/api/?results=12&nat=gb';

//fetch 12 random users
fetch(url)
  .then(response => response.json())
  .then(data => {
    usersList = data.results;
    createUsers(data.results);
  });
