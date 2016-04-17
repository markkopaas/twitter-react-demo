module.exports = {
    tweetSortOrders: ['byDate', 'userMentionsFirst'],
    getSortFunction: function (tweetSortOrder, userScreenName) {
        switch (tweetSortOrder) {
            case 'byDate':
                return function (a, b) {
                    return getTime(b) - getTime(a)
                };
                break;
            case 'userMentionsFirst':
                return function (a, b) {
                    return (userMentionedIn(userScreenName, a) ? 0 : 1 - userMentionedIn(userScreenName, b) ? 0 : 1) ||
                        (getTime(b) - getTime(a))
                };
                break;
        };
    }
};

function userMentionedIn(userScreenName, tweet) {
    var userMentions = tweet.entities.user_mentions;

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
