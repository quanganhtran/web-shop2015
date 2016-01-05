/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // Try to look up user using the provided username
    User.findOne({
      username: req.param('username')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.ok();
        }
      });
    });
  },

  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.me = null;

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },

  /**
   * UserController.signup()
   * Register a new user
   *
   * @param  {Object}   req
   * @param  {Object}   req.params
   *                     • username {String}
   *                     • password {String}
   * @param  {Function} res
   */
  signup: function (req, res) {
    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      // An unexpected error occurred.
      error: function (err){
        return res.negotiate(err);
      },
      // OK.
      success: function (encryptedPassword){
        // Build the URL of a gravatar image for a particular email address.
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function (err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            // Create a User with the params sent from
            // the sign-up form --> signup.ejs
            User.create({
              name: req.param('name'),
              username: req.param('username'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl,
              address: req.param('address'),
              phone: req.param('phone')
            }, function userCreated(err, newUser) {
              if (err) {

                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                  && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              // Log user in
              req.session.me = newUser.id;

              // Send back the id of the new user
              return res.json({
                id: newUser.id
              });
            });
          }
        })
      }
    });
  },

  /**
   * UserController.setMerchant()
   * Promote a user to be a merchant, or demote a merchant.
   * A merchant has the right to put up items for sale.
   *
   * @param  {Object}   req
   * @param  {Object}   req.params
   *                     • id
   *                     • role {Integer}
   * @param  {Function} res
   */
  setMerchant: function (req, res) {
    // TODO: Implement the function
    User.findOne(req.param('id')).exec(function (err, user){
      if (err) return res.negotiate(err);
      if (!user) return res.notFound('User not found.');
      if (user.role == 1) return res.forbidden('The action requested cannot be performed on this user.');
      var newRole = user.role == 3 ? 2 : 3;
      User.update(req.param('id'), {
        role: newRole
      }).exec(function (err, user){
        if (err) return res.negotiate(err);
        var msg = user.id == 3 ? 'Merchant privilege has been granted for this user.' : 'Merchant privilege has been revoked from this user.';
        return res.ok(msg);
      });
    });
  },

  /**
   * UserController.info()
   */
  info: function (req, res) {
    if (!req.params.username && !req.session.me) {
      if (req.wantsJSON) {
        return res.ok('You are not logged in.');
      }
      return res.redirect('/');
    }
    var target = req.params.username || req.session.me;
    User.findOne({username: target}).exec(function (err, user) {
      if (err) {
        console.log(err);
        return res.notFound();
      }
      if (req.wantsJSON) {
        return res.ok(user);
      }
      return res.view('profile', {user: user, req: req});
    });
  }

};

