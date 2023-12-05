$(document).ready(function() {
  // --- our code goes here ---
  console.log(this);

  $('.new-tweet form textarea').on('input', function() {
    $('.counter').text(140 - this.value.length);
    if (140 - this.value.length < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '');
    }
  });
});