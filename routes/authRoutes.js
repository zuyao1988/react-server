const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function(req, res) {
      //Successfully authenticate, do something.
      res.send("Successfully login with fb!");
    });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    //res.send({"data": "Logout Successfully!", "user": req.user});
  });

  app.get('/api/current_user', (req, res) => {
    if (!req.user) {
      res.send("");
      return;
    };
    res.send(req.user);
  })
};
