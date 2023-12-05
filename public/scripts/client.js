/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // load tweets from server.
  const loadTweets = function() {
    $.ajax('/tweets', {
      method: 'GET',
    }).done(function(data) {
      renderTweets(data);
    });
  };


  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass('tweet');
    const html = `
      <header>
        <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
        <div class="user-info">
          <h2>${tweet.user.name}</h2>
          <p>${tweet.user.handle}</p>
        </div>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
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
    
    if (inputData.trim() === '' || inputData === null || inputData.length > 140) {
      alert("Please input correct content!");
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
        loadTweets();
        console.log("complete");
      });
    }
  });

  loadTweets();
});