var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var userInputScores = convertScores(req.body.scores);
        var friendDifferences = getFriendDifferences(userInputScores, friends);
    });
}

function convertScores(scores) {
    for (var i = 0; i < scores.length; i++) {
        scores[i] = parseInt(scores[i]);
    }
    return scores;
}

function getTotalDifference(newFriendScores, oldFriendScores) {
    var totalDifference = 0;
    for (var i = 0; i < newFriendScores.length; i++) {
        totalDifference += Math.abs(newFriendScores[i] - oldFriendScores[i]);
    }
    return totalDifference;
}

function getFriendDifferences(userInputScores, friends) {
    var friendDifferences = [];
    for (var i = 0; i < friends.length; i++) {
        var totalDifference = getTotalDifference(userInputScores, friends[i].scores);
        friendDifferences.push(totalDifference);
    }
    return friendDifferences;
}