
// ===============================================================================
// LOAD DATA
// We are linking our routes to a  "data" source. 
// These data sources hold arrays of information on all possible friends
// ===============================================================================
var friends = require('../data/friends.js');
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app){
    //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    // a POST route to get a userInput data from the survey form and calculate the best match
    app.post('/api/friends', function(req, res){
        // Capture the user input object
            var userInput = req.body;
            console.log('userInput = ' + JSON.stringify(userInput));
            var userName = userInput.name;
            var userPhoto = userInput.photo;
            var userScores = userInput.scores;
            console.log('userScores = ' + userScores);
            var differenceArray = [];//to store scores differents for each person in the database and a new user
            
            //bestMatch object
            var bestMatch = {
                name: "",
                photo: "",
                friendDifference: 0
            };
            
            // check every person in the friends array
            for(var i = 0; i < friends.length; i++){
                console.log(friends[i].name);
                var difference = 0;
                // check scores for all 10 questions for each person in the friends array
                for (var j = 0; j < friends[i].scores[j]; j++){
                //calculate the difference between the scores and store them in the array
                difference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScores[j])));
                console.log('difference = ' + difference);
                }
                differenceArray.push(difference);
                console.log('difference Array = ' + differenceArray);
            }

            //find the best match (find min in the array)
            for (var i = 0; i < differenceArray.length; i++){
                if(differenceArray[i] <= bestMatch.friendDifference){
                    friendDifference =i;
                }
            }
            //return bestMatch data
            var bestFriendMatch = friends[friendDifference];
            res.json(bestFriendMatch);
            
            //pushes the new userInput into the friends array
            friends.push(req.body);

    });


};