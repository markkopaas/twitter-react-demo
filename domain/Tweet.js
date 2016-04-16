var Tweet = function Tweet (input) {
    return {
        id: input.id,
        text: input.text,
        entities: input.entities && {
            user_mentions: input.entities.user_mentions
        }
    };
};

module.exports = Tweet;
