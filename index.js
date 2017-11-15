const express = require('express');
const dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
	region: 'ap-southeast-1'
});

//use local dynamodb for development environment
//Command to run cd -> dynamodb directory
//java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
if (process.env.NODE_ENV !== 'production') {
	dynamoose.local();
}

const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets, main.js file / main.css file
	app.use(express.static('client/build'));

	// Express will serve up xxx.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
