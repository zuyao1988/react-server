const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

const dynamoose = require('dynamoose');
const User = dynamoose.model('users');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		if (!req.user.credits) {
			try {
				const user = await User.update({ id: req.user.id }, { credits: 5 });
				res.send(user);
			} catch (err) {
				res.send(err);
			}
		} else {
			req.user.credits += 5;
			const user = await req.user.save();
			console.log('...', user);
			res.send(user);
		}
	});
};
