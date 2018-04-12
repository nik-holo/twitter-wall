var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.on('connection', function(socket){
    console.log('Cube connected');
});

var updateTweet = function(text, image, author) {
    io.emit('tweetUpdated', {
        text: text,
        image: image,
        author: author
    });
};

var client = new Twitter({
    consumer_key: 'PfVMnUBJKwnM8CSuSqGm1H0EO',
    consumer_secret: 'bWZ4yR1IosMfOhW4JwcdmBUIKgVjDgdRv0J9pk26mx9l8ORzvu',
    access_token_key: '48006556-m2sEgzvjvOIvJyLpmsziRp4oic54F31LqNCBHkl63',
    access_token_secret: 'JYcCbmvi6X25p5OIm93dI9TffTYo5ivPEoJfPlPUKN1YI',
});

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {track: '#BlackLivesMatter'},  function(stream){
    stream.on('data', function(tweet) {
        var image = tweet.entities[0] && tweet.entities[0].media[0] || tweet.user.profile_image_url.replace('_normal', '');
        updateTweet(tweet.text, image , tweet.user.screen_name);
        console.log(tweet);
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});
