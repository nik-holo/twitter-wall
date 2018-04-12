// clear local storage run in case of errors
// localStorage.removeItem('tweetsJSON')

function updateData() {
    var tweets = JSON.parse(localStorage['tweetsJSON']);
    $(".tweets").html('');

    $(tweets).each(function (index) {
        $(".tweets").append('<div class="tweet" style="width: 250px">\n' +
            '        <div class="card-body">\n' +
            '            <a href="https://twitter.com/\' + this.author + \'">' +
            '               <img class="rounded" width="70px" src="' + this.image + '">\n' +
            '               <span class="card-title">@' + this.author + '</span>\n' +
            '            </a>' +
            '            <br><br>' +
            '            <p class="card-text">' + this.text + '</p>\n' +
            '            <button data-id="' + index + '" class="skip btn btn-dark">Skip 👎</button>\n' +
            '            <button data-name="' + this.author + '" data-id="' + index + '" class="ban btn btn-danger">Ban user</button>\n' +
            '        </div>\n' +
            '    </div>')
    });

    $('h1').text('Upcoming tweets: ' + tweets.length);
}

function removeTweet($this) {
    var tweets = JSON.parse(localStorage['tweetsJSON']);
    tweets.splice($this.data('id'), 1);
    localStorage['tweetsJSON'] = JSON.stringify(tweets);
    $this.parent().parent().toggle(100);
    updateData();
}

function banUser(name) {
    if (localStorage['bannedUsers']){
        var banned = JSON.parse(localStorage['bannedUsers']);
    } else {
        var banned = [];
    }
    banned.push(name);
    localStorage['bannedUsers'] = JSON.stringify(banned);
}

// var showInterval = setInterval(updateData, 5000);

$('body')
    .on('click', 'button.skip', function () {
        removeTweet($(this));
    })
    .on('click', 'button.ban', function () {
        banUser($(this).data('name'));
        removeTweet($(this));
    });

updateData();
