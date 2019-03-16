(()=>{
  //Get all needed HTML
  const allImages = document.querySelectorAll('.slide');
 
  //Event Handler
  window.addEventListener('scroll', moveSlide);

 //function to help convert the value of OldMin and OldMax into a range from 0 to 50 || 0 to -50
  function calculateYPos(OldMin, OldMax, newMin, newMax, OldValue){
    let OldRange = OldMax - OldMin;
    let newRange = newMax - newMin;
    return((OldValue - OldMin) * newRange/OldRange) + newMin;
  } 

 //function to parallax the background images
  function moveSlide(){
    //get the current scrollBar position
    let scrollPos = window.scrollY || document.body.scrollTop;
    //loop through the images
    allImages.forEach((image) => {
      //check if the scrollBar plus half size of the window height has passed the offsetTop of the image
      if((scrollPos + window.innerHeight / 2) > image.offsetTop){
        //get the top value of the image
        let OldMin = (image.offsetTop < window.innerHeight / 2) ? image.offsetTop : image.offsetTop - window.innerHeight / 2;
        //get the height of the image
        let OldMax = OldMin + image.offsetHeight;
        //get the yPosition to transform the image background position
        let yPosition = calculateYPos(OldMin, OldMax, 0, 50, scrollPos);
        //change the image background position
        image.style.backgroundPosition = `center ${yPosition}px`;
      }
    });
  } 
})();