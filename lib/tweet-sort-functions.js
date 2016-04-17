module.exports = {
    tweetSortOrders: ['byDate', 'userMentionsFirst'],
    getSortFunction: function (tweetSortOrder, userScreenName) {
        switch (tweetSortOrder) {
            case 'byDate':
                return sortByDate;
                break;
            case 'userMentionsFirst':
                return sortByUserMentionsFirst(userScreenName);
                break;
        };
    }
};

function sortByDate (inputArray) {
    return inputArray.sort(function (a, b) {
        return getTime(b) - getTime(a);
    })
};

function sortByUserMentionsFirst (userScreenName) {
    return function (inputArray) {
        var userMentionedArray    = [];
        var userNotMentionedArray = [];

        sortByDate(inputArray).forEach(function (tweet) {
            if (userMentionedIn(userScreenName, tweet)) {
                userMentionedArray.push(tweet);
            } else {
                userNotMentionedArray.push(tweet);
            }
        });
        return userMentionedArray.concat(userNotMentionedArray);
    }
}

function userMentionedIn(userScreenName, tweet) {
    var userMentions = tweet.entities && tweet.entities.user_mentions || [];

    for (var i = 0; i < userMentions.length; i++) {
        if (userMentions[i].screen_name === userScreenName) {
            return true;
        }
    }

    return false;
}

function getTime(tweet) {
    return new Date(tweet.created_at).getTime()
}
