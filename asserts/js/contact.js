//Js file for handling the contact form
(function(){
  //get the html elements needed 
  const allForm = document.getElementById('contact-form') || document.getElementById("app-form");

  //diasble native browser form validation
  allForm.setAttribute('novalidate', true);

  //function to check input field validation
  const checkInput = (field)=>{
      // Don't validate submits, buttons, file and reset inputs, and disabled fields
      if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

      // Get validity
      var validity = field.validity;
  
      // If valid, return null
      if (validity.valid) return;
  
      // If field is required and empty
      if (validity.valueMissing) return 'Please fill out this field.';
  
      // If not the right type
      if (validity.typeMismatch) {
          // Email
          if (field.type === 'email') {
            return 'Please enter a valid email address.'
          };
      }
      // If too short
      if (validity.tooShort) return 'Please enter ' + field.getAttribute('minLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';
  
      // If number input isn't a number
      if (validity.badInput) return 'Please enter a number.';

      // If pattern doesn't match
      if (validity.patternMismatch) {
          // Otherwise, generic error
          return 'Please match the requested format.';
      }
      // If all else fails, return a generic catchall error
      return 'The value you entered for this field is invalid.';
  }

  //Function to show the errors
  const showErrors = (field, error)=>{
    // Add error class to field
    field.previousElementSibling.classList.add('showTimesIcon');
    field.previousElementSibling.previousElementSibling.classList.remove('showCheckIcon');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.error-message#error-for-' + id );
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        //field.parentElement.appendChild(message);
        field.parentElement.insertBefore( message, field.nextSibling );
    }

    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';
    message.style.position = 'absolute';
  }

  //Function to remove errors
  const removeError = (field)=>{
    // Remove error class to field
    field.previousElementSibling.classList.remove('showTimesIcon');
    field.previousElementSibling.previousElementSibling.classList.add('showCheckIcon');

    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
    message.style.position = 'none';
  }

  //Function to handle form submission and AJAX
  const handleContactSubmit = (e)=>{
    
    //prevent Form actual submissions
    e.preventDefault();
    
    //get all form elements
    let fields = e.target.elements;
    let fieldLength = fields.length;

    let error, hasErrors;
    //loop
    for(let i = 0; i < fieldLength; i++ ){
      error = checkInput(fields[i]);

      //show error if there is any
        if (error) {
            showErrors(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if(hasErrors){
      hasErrors.focus();
    }

    // Otherwise, let the form submit normally
    // You could also bolt in an Ajax form submit process here
    
  }

  //function to handle blur input event
  const handleBlur = (e)=>{
    
    //check form input validation
    let error = checkInput(e.target);

   //check if there were errors
   if(error){
      showErrors(e.target, error);
      return;
   }

    // Otherwise, remove any existing error message
    removeError(event.target);
  }

  //add event listeners
  allForm.addEventListener('blur', handleBlur, true); //useCapture or event propagation
  allForm.addEventListener('submit', handleContactSubmit)
})();