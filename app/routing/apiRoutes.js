
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
// a POST route to Add a new friend into friends array and calculate the best match
app.post('/api/friends', function(req, res){
   // Capture the user input object
		var userInput = req.body;
		console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		console.log('userResponses = ' + userResponses);


});


};