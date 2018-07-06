// ===============================================================================
// LOAD DATA
// We are linking our routes to a  "data" source. 
// These data sources hold arrays of information on all possible friends
// ===============================================================================
var friends = require('../data/friends.js');
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
    //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    // a POST route to get a userInput data from the survey form and calculate the best match
    app.post('/api/friends', function(req, res) {

        // Capture the user input object
        var newUserInput = {
            name: req.body.name,
            photo: req.body.photo,
            scores: []
        };
        console.log('new User Input name - ' + req.body.name);
        // store newUserInput scores in the array
        var scoresArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            scoresArray.push(parseInt(req.body.scores[i]))
        }
        newUserInput.scores = scoresArray;
        console.log('new User Input Scores  Array = ' + scoresArray);

        //  check the new User Input entry with the existing ones
        var scoreDiffArray = [];
        for (var i = 0; i < friends.length; i++) {

            // Check each friend's scores and summarize the difference 
            var scoreDiff = 0;
            for (var j = 0; j < newUserInput.scores.length; j++) {
                scoreDiff += Math.abs(newUserInput.scores[j] - friends[i].scores[j]);
                console.log('scoreDifference = ' + scoreDiff + "  j = " + j);
            }
            // summ of differences for each friend and new User store in the array
            scoreDiffArray.push(scoreDiff);
            console.log('scoreDiffArray for each object in the friends array = ' + scoreDiffArray + " i = " + i);
        }
        console.log('scoreDiffArray TOTAL = ' + scoreDiffArray);

        // Determine the best match using the postion of the best match in the friends array
        var bestMatchPosition = 0;
        for (var i = 1; i < scoreDiffArray.length; i++) {

            if (scoreDiffArray[i] <= scoreDiffArray[bestMatchPosition]) {
                bestMatchPosition = i;

            }

        }
        //return best Match data
        var bestFriendMatch = friends[bestMatchPosition];
        res.json(bestFriendMatch);

        //pushes the new userInput into the friends array
        friends.push(newUserInput);

    });

};