(() => {
  //Get all needed HTML tags
  const menuBar = document.querySelector('#bar');
  const closeBar = document.querySelector('#close');
  const navMenu = document.querySelector('#main-nav');
  
  //Event Handler
  menuBar.addEventListener('click', showMenu);
  closeBar.addEventListener('click', closeMenu);

  //Function to show the menu
  function showMenu(){
    console.log('show');
    //check if the class has not been added then add
    if(navMenu.className !== 'show'){
      //add class
      navMenu.classList.add('show');
    }
  }

  //Function to hide the menu
  function closeMenu(){
    //check if class to show is added 
    if(navMenu.className === 'show'){
      //remove class
      navMenu.classList.remove('show');
    }
  }
})();