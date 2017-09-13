const express = require('express');
const dynamoose = require('dynamoose');
dynamoose.AWS.config.update({
  region: 'ap-southeast-1'
});
dynamoose.local();
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/login', (req, res) => {
	res.send({ hi : 'login' });
});

// app.get('/reports/:id', (req, res) => {
// 	res.send({ hi : 'there' });
// });

const PORT = process.env.PORT || 5000

app.listen(PORT);
