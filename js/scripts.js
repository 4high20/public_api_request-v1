//create the search form
const searchForm = document.createElement('form');
searchForm.innerHTML = '<input type="search" id="search-input" class="search-input" placeholder="Search..."><input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">';
searchForm.setAttribute('action', '#');
searchForm.setAttribute('method', 'get');
document.querySelector('.search-container').appendChild(searchForm);

//this function removes the modal window
function removeModal(){
  const modal = document.querySelector('.modal-container');
  modal.remove();
}

//this function creates gallery items div with each user card inside and listens for clicks on cards to display the modal window
function createUsers(users){
  for(let i = 0; i < 12; i++){
    const galleryItems = document.createElement('div');
    galleryItems.innerHTML = `<div class="card-img-container"><img class="card-img" src="${users[i].image}" alt="profile picture"></div><div class="card-info-container"><h3 id="name" class="card-name cap">${users[i].firstName} ${users[i].lastName}</h3><p class="card-text">${users[i].email}</p><p class="card-text cap">${users[i].city}</p></div>`;
    galleryItems.classList.add('card');
    document.querySelector('#gallery').appendChild(galleryItems);
    galleryItems.addEventListener('click', (e) => {
      createModal(users[i]);
      const closeModal = document.querySelector('#modal-close-btn');
      closeModal.addEventListener('click', (e) => {
        removeModal();
      });
    })
  }
}

//this function create a user object that will be used to create every user card and modal window
function getUserData(data){
  let obj = {};
  obj.image = data.results[0].picture.large;
  obj.firstName = data.results[0].name.first;
  obj.lastName = data.results[0].name.last;
  obj.email = data.results[0].email;
  obj.city = data.results[0].location.city;
  obj.cell = data.results[0].cell;
  obj.street = data.results[0].location.street;
  obj.state = data.results[0].location.state;
  obj.post = data.results[0].location.postcode;
  obj.bday = data.results[0].dob.date.substring(0, 10);
  return obj;
}

//this function creates the modal window
function createModal(user){
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal-container');
  modalDiv.innerHTML = `<div class="modal"><button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button><div class="modal-info-container"><img class="modal-img" src="${user.image}" alt="profile picture"><h3 id="name" class="modal-name cap">${user.firstName} ${user.lastName}</h3><p class="modal-text">${user.email}</p><p class="modal-text cap">${user.city}</p><hr><p class="modal-text">${user.cell}</p><p class="modal-text">${user.street}, ${user.state}, ${user.post}</p><p class="modal-text">Birthday: ${user.bday}</p></div>`;
  document.querySelector('body').appendChild(modalDiv);
}

//API url
const url = 'https://randomuser.me/api/';

//fetch a random user from randomuser api 12 times and stores it into the usersArray
const usersArray = [];
for(let i = 0; i < 12; i++){
  usersArray.push(
    fetch(url)
      .then(response => response.json())
      .then(data => getUserData(data))
  )
}

//create every user cards only after the 12 fetch promises are resolved
Promise.all(usersArray)
  .then(data => createUsers(data));
