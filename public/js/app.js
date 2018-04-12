// clear local storage run in case of errors
// localStorage.removeItem('tweetsJSON')

'use strict';


var socket = io();
var cube = new Cube(document.getElementById('container'));

var tweets = [];

if (localStorage['tweetsJSON']) {
    if (localStorage['tweetsJSON'] != null) {
        tweets = JSON.parse(localStorage['tweetsJSON']);
    }
}

socket.on('tweetUpdated', function (data) {
    if (localStorage['bannedUsers']){
        if (!JSON.parse(localStorage['bannedUsers']).includes(data.author)) {
            addTweetToQueue(data)
        }
    }
});

function addTweetToQueue(data) {
    tweets = JSON.parse(localStorage['tweetsJSON']);
    tweets.push(data);
    localStorage['tweetsJSON'] = JSON.stringify(tweets);
}
function showNextTweet() {
    if (localStorage['tweetsJSON'] && localStorage['tweetsJSON'] != null) {
        tweets = JSON.parse(localStorage['tweetsJSON']);
        if (tweets.length > 0) {
            cube.displayTweet(tweets[0]);
            tweets.splice($(this).data('id'), 1);
            localStorage['tweetsJSON'] = JSON.stringify(tweets);
        }
    }
}

var showInterval = setInterval(showNextTweet, 10000);
showNextTweet();


