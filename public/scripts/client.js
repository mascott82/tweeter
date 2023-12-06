/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  $('#error-message').hide();
  $('#new-tweet').hide();

  // Function to escape HTML entities
  const escapeHTML = function(str) {
    return $('<div>').text(str).html();
  };

  // load tweets from server.
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
    }).done(function(data) {
      renderTweets(data);
    });
  };

  // Event listener for 'Write a new tweeet'.
  $('#write-tweet').on('click', function() {
    $('#new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');
  
    const html = `
    <header>
      <img src="${escapeHTML(tweet.user.avatars)}" alt="User Profile Image">
      <div class="user-info">
        <h2>${escapeHTML(tweet.user.name)}</h2>
        <p>${escapeHTML(tweet.user.handle)}</p>
      </div>
    </header>
    <p class="tweet-content">${escapeHTML(tweet.content.text)}</p>
    <footer>
      <div>${escapeHTML(timeago.format(tweet.created_at))}</div>
      <div class="actions">
        <a href="#"><i class="far fa-comment"></i></a>
        <a href="#"><i class="fas fa-retweet"></i></a>
        <a href="#"><i class="far fa-heart"></i></a>
      </div>
    </footer>
    `;

    $tweet.html(html);
  
    return $tweet;
  };

  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container');
    $tweetsContainer.empty();
  
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

  // add an event listener that listens for the submit event
  $('#tweetSubmit').on('click', function(event) {
    event.preventDefault();
    const inputData = $('#tweet-text').val();
    
    if (inputData.trim() === '' || inputData === null) {
      $('#error-message').text("Please input correct content!").slideDown();
    } else if (inputData.length > 140) {
      $('#error-message').text('⚠️ Too long. Plz rspct our arbitary limit of 140 chars. #kthxbye. ⚠️').slideDown();
    } else {
      $.ajax('/tweets', {
        method: 'POST',
        dataType: 'text',
        data: $('form').serialize()
      }).done(function() {
        console.info("sucess");
      }).fail(function() {
        console.error("error");
      }).always(function() {
        $('#tweet-text').val('');
        $('#error-message').slideUp();
        loadTweets();
        console.log("complete");
      });
    }
  });

  loadTweets();
});