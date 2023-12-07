// Document ready event: Executes when the DOM is fully loaded
$(document).ready(function() {
  // --- our code goes here ---

  // Event listener for input changes in the tweet text area
  $('.new-tweet form textarea').on('input', function() {
    // Update the character counter
    $('.counter').text(140 - this.value.length);

    // Change counter text color to red if character limit is exceeded
    if (140 - this.value.length < 0) {
      $('.counter').css('color', 'red');
    } else {
      // Reset counter text color if within character limit
      $('.counter').css('color', '');
    }
  });

  // Event listener for window scroll
  $(window).on('scroll', function() {
    // Get the current scroll position
    let scrollTop = $(window).scrollTop();

    // Toggle visibility of the "Scroll to Top" button based on scroll position
    if (scrollTop === 0) {
      $('#scrollToTopBtn').fadeOut();
    } else {
      $('#scrollToTopBtn').fadeIn();
    }

    // Toggle visibility of the navigation bar based on scroll position
    if (scrollTop > $('#navBar').height()) {
      $('#navBar').fadeOut();
    } else {
      $('#navBar').fadeIn();
    }
  });


  // Click event handler for the "Scroll to Top" button
  $('#scrollToTopBtn').click(function() {
    // Scroll smoothly to the top of the page
    $('html, body').animate({scrollTop: 0}, 'slow');
  });
});