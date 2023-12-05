/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },

  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

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
        <p>${tweet.created_at}</p>
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
      $tweetsContainer.append($tweet);
    });
  };

  // add an event listener that listens for the submit event
  $('#tweetSubmit').on('click', function(event) {
    event.preventDefault();

    $.ajax('/tweets', {
      method: 'POST',
      dataType: 'text',
      data: $('form').serialize()
    }).done(function() {
      console.info("sucess");
    }).fail(function() {
      console.error("error");
    }).always(function() {
      console.log("complete");
    });
  });

  loadTweets();
});