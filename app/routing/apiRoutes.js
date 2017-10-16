var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var userInputScores = convertScores(req.body.scores);
        var friendDifferences = getFriendDifferences(userInputScores, friends);
        var bestMatchIndex = getIndexOfBestMatch(friendDifferences);
        var bestMatch = friends[bestMatchIndex];
        console.log(bestMatch);
        res.json(bestMatch);
    });
}

function convertScores(scores) {
    var intScores = [];
    for (var i = 0; i < scores.length; i++) {
        var score = parseInt(scores[i]);
        intScores.push(score);
    }
    return intScores;
}

function getFriendDifferences(userInputScores, friends) {
    var friendDifferences = [];
    for (var i = 0; i < friends.length; i++) {
        var totalDifference = getTotalDifference(userInputScores, friends[i].scores);
        friendDifferences.push(totalDifference);
    }
    return friendDifferences;
}

function getTotalDifference(newFriendScores, oldFriendScores) {
    var totalDifference = 0;
    for (var i = 0; i < newFriendScores.length; i++) {
        totalDifference += Math.abs(newFriendScores[i] - oldFriendScores[i]);
    }
    return totalDifference;
}

function getIndexOfBestMatch(friendDifferences) {
    var index = 0;
    var value = friendDifferences[0];
    for (var i = 1; i < friendDifferences.length; i++) {
        if (friendDifferences[i] < value) {
            value = friendDifferences[i];
            index = i;
        }
    }
    return index;
}