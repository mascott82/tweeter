/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // Hide error message and new tweet form initially
  $('#error-message').hide();
  $('#new-tweet').hide();

  // Function to escape HTML entities
  const escapeHTML = function(str) {
    return $('<div>').text(str).html();
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
    }).done(function(data) {
      // Render tweets on successful retrieval
      renderTweets(data);
    });
  };

  // Event listener for 'Write a new tweet' button
  $('#write-tweet').on('click', function() {
    // Toggle visibility of the new tweet form and focus on the tweet input field
    $('#new-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  // Function to create HTML element for a single tweet
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

    // Set the HTML content of the tweet element
    $tweet.html(html);
  
    return $tweet;
  };

  // Function to render an array of tweets
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container');
    // Clear existing tweets in the container
    $tweetsContainer.empty();
    
    // Iterate through tweets and prepend each to the container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  };

  // Event listener for the tweet submission form
  $('#tweetSubmit').on('click', function(event) {
    event.preventDefault();
    // Get the input data from the tweet text area
    const inputData = $('#tweet-text').val();
    
    // Validate the input data
    if (inputData.trim() === '' || inputData === null) {
      // Display error message for empty input
      $('#error-message').text("Please input correct content!").slideDown();
    } else if (inputData.length > 140) {
      // Display error message for exceeding character limit
      $('#error-message').text('⚠️ Too long. Plz rspct our arbitary limit of 140 chars. #kthxbye. ⚠️').slideDown();
    } else {
      // Perform AJAX request to submit the tweet
      $.ajax('/tweets', {
        method: 'POST',
        dataType: 'text',
        data: $('form').serialize()
      }).done(function() {
        // Reset the tweet text area, hide error message, and reload tweets on successful submission
        $('.counter').text(140);
        $('#tweet-text').val('');
        $('#error-message').slideUp();

        loadTweets();
      }).fail(function() {
        console.error('Failed to submit.');
      });
    }
  });

  // Initial load of tweets when the page is ready
  loadTweets();
});