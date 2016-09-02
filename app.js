// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8085;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router



// test route to make sure everything is working (accessed at GET http://localhost:8085/api)
router.get('/', function(req, res) {
    res.json({ message: 'GET request works' });  
});

router.post('/query', function(req, res) {
	var intent = req.body.result.metadata.intentName;
	switch (intent) {
		case "Initiate":
			res.json(chatInitiate());
			break;
		case "Billing":
			res.json(billInquiry());
			break;
		case "yes-initiate":
			res.json(recommendTV());
			break;
		case "Recommendation":
			res.json(recommendTV());
			break;
		default:
			res.json(recommendTV());
	}
});

function recommendTV() {
	return (
		{
			speech: "Here are some recommendations for tonight", 
			displayText: "TV recommendations", 
			data:         {
				"facebook": {
				  "attachment": {
					"type": "template",
					"payload": {
					  "template_type": "generic",
					  "elements": [
						{
						  "title": "Shark Tank",
						  "subtitle": "Shark Tank",
						  "image_url": "http://image.vam.synacor.com.edgesuite.net/0f/07/0f07592094a2a596d2f6646271e9cb0311508415/w=414,h=303,crop=auto/?sig=88c390c980d4fa53d37ef16fbdc53ec3dfbad7d9fa626949827b76ae37140ac3&amp;app=powerplay",
						  "buttons": [
							{
							  "type": "web_url",
							  "url": "http://www.youtube.com/embed/SQ1W7RsXL3k",
							  "title": "Watch video"
							},
							{
							  "type": "web_url",
							  "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
							  "title": "Record"
							}
						  ]
						},
						{
						  "title": "Game of Thrones",
						  "subtitle": "Game of Thrones",
						  "image_url": "http://ia.media-imdb.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_UX182_CR0,0,182,268_AL_.jpg",
						  "buttons": [
							{
							  "type": "web_url",
							  "url": "https://www.youtube.com/watch?v=36q5NnL3uSM",
							  "title": "Watch video"
							},
							{
							  "type": "web_url",
							  "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
							  "title": "Record"
							}
						  ]
						},
						{
						  "title": "The Night Of",
						  "subtitle": "The Night Of",
						  "image_url": "http://ia.media-imdb.com/images/M/MV5BMjQyOTgxMDI0Nl5BMl5BanBnXkFtZTgwOTE4MzczOTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
						  "buttons": [
							{
							  "type": "web_url",
							  "url": "https://www.youtube.com/watch?v=36q5NnL3uSM",
							  "title": "Watch video"
							},
							{
							  "type": "web_url",
							  "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
							  "title": "Record"
							}
						  ]
						}
					  ]
					}
				  }
				}  
			}, 
			source: "Zero Service - app_zero.js"
		}
	);
}

function chatInitiate() {
	return (
				{speech: "Hi,there. I am Ent, an entertainment bot.  Would you like to see some recommendations for tonight?", 
				displayText: "TV Recommendations", 
				data:         {
					"facebook": {
						"attachment": {
							"type":"template",
							"payload":{
								"template_type":"button",
								"text":"Hi,there. I am Ent, an entertainment bot.  Would you like to see some recommendations for tonight?",
								//"template_type":"generic",
								//"elements":[
								//	{
								//		"title":"Hi,there. I am Ent, an entertainment bot.",
								//		"image_url":"https://petersfancybrownhats.com/company_image.png",
								//		"subtitle":"Would you like to see some recommendations for tonight?",
										"buttons":[
										  {
											"type":"postback",
											"title":"Yes",
											"payload":"Yes"
										  },
										  {
											"type":"postback",
											"title":"No",
											"payload":"No"
										  }
										]
								//	}
								//]
							}
						}
					}  
				}, 
				source: "Zero Service - app_zero.js"}
			);	
}

function billInquiry() {
	return (
				{speech: "Let me get an expert to help you.  Please click on the link below.", 
				displayText: "TV Recommendations", 
				data:         {
					"facebook": {
					  "attachment": {
						  "type":"template",
							  "payload":{
									"template_type":"button",
									"text":"Unfortunately, I'm unable to help with that query.  Would you like to talk to an expert?",
									"buttons":[
									  {
										"type":"postback",
										"title":"Talk to an agent",
										"payload":"Talk to an agent"
									  },
									  {
										"type":"postback",
										"title":"No, thanks",
										"payload":"No, thanks"
									  }
									]
							  }
					  }
					}  
				}, 
				source: "Zero Service - app_zero.js"}
			);	
}

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Node server started...');

