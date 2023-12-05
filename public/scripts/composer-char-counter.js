$(document).ready(function() {
  // --- our code goes here ---

  $('.new-tweet form textarea').on('input', function() {
    $('.counter').text(140 - this.value.length);
    if (140 - this.value.length < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '');
    }
  });

  $(window).on('scroll', function() {
    let scrollTop = $(window).scrollTop();
    if (scrollTop === 0) {
      $('#scrollToTopBtn').fadeOut();
    } else {
      $('#scrollToTopBtn').fadeIn();
    }

    if (scrollTop > $('#navBar').height()) {
      $('#navBar').fadeOut();
    } else {
      $('#navBar').fadeIn();
    }
  });


  // Click event handler for scrollToTopBtn
  $('#scrollToTopBtn').click(function() {
    // Scroll to the top of the page
    $('html, body').animate({scrollTop: 0}, 'slow');
  });
});