const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dynamoose = require('dynamoose');
const keys = require('../config/keys');

const User = dynamoose.model('users');

passport.serializeUser((user, done) => {
	console.log('encode ppl: ', user);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log("Dese : ", id);
	User.get({id: id})
		.then((user) => {
			console.log('continue ppl: ', user);
			done(null, user);
	  });
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.scan({ googleId: profile.id }, function(err, existingUser) {
			if (existingUser.count > 0) {
				//we alrd have a record with the given profile ID
				var user = existingUser[0]
				console.log('revisit user: ', user);
				done(null, user)
			} else {
				//we don't have a user record with this ID, make a new record.
				new User({ id: '' , googleId: profile.id })
					.save()
					.then(user => {
						console.log('new user: ', user);
						done(null, user)
					});
			}
		});
	})
);

passport.use(
	new FacebookStrategy({
		clientID: keys.facebookClientID,
		clientSecret: keys.facebookClientSecret,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'email', 'name'],
	}, (accessToken, refreshToken, profile, done) => {
		console.log("facebook User : ", profile);
		User.scan({ facebookId: profile.id}, function(err, existingUser) {
			console.log('facebook User : ', existingUser);
			if (existingUser.count > 0) {
				//we alrd have a record with the given profile ID
				var user = existingUser[0]
				console.log('revisit user: ', user);
				done(null, user)
			} else {
				//we don't have a user record with this ID, make a new record.
				new User({ id: '' , facebookId: profile.id })
					.save()
					.then(user => {
						console.log('new user: ', user);
						done(null, user)
					});
			}
		});
	})
);
