/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // render the profile view (/views/user/edit.ejs)
  getEditView: function (req, res, next) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view('user/edit', {layout: 'layouts/loggedIn', me: user});
    });
  },


// render the profile view (/views/profile.ejs)
  showProfile: function (req, res, next) {
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.view('user/profile', {layout: 'layouts/loggedIn', me: user});
    });
  },

  // render the edit view (e.g. /views/edit.ejs)
  edit: function (req, res) {

    if (req.param('password')) {
      var Passwords = require('machinepack-passwords');

      // Encrypt a string using the BCrypt algorithm.
      Passwords.encryptPassword({
        password: req.param('password'),
      }).exec({
        // An unexpected error occurred.
        error: function (err) {
          return res.negotiate(err);
        },
        // OK.
        success: function (encryptedPassword) {
        },
        error: function (err) {
          return res.negotiate(err);
        }
      })
    }

    User.create({
      name: req.param('name'),
      username: req.param('username'),
      email: req.param('email'),
      encryptedPassword: encryptedPassword,
      lastLoggedIn: new Date(),
      gravatarUrl: gravatarUrl,
      address: req.param('address'),
      phone: req.param('phone'),
      role: role,
      isApplyingForMerchant: req.param('isApplyingForMerchant') === true
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

        if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
          && err.invalidAttributes.email[0].rule === 'email') {
          return res.notValidEmail();
        }

        // If this is a uniqueness error about the username attribute,
        // send back an easily parseable status code.
        if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0]
          && err.invalidAttributes.username[0].rule === 'unique') {
          return res.usernameInUse();
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

    })
  },

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    if (req.session.me) {
      User.findOne(req.session.me).exec(function(err, user) {
        if (err) return res.negotiate(err);
        if (!user) {
          req.session.me = null;
          return res.notFound();
        }
        delete user.encryptedPassword;
        return res.ok(user);
      })
    } else {
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
          error: function (err) {
            return res.negotiate(err);
          },
          // If the password from the form params doesn't checkout w/ the encrypted
          // password from the database...
          incorrect: function () {
            return res.notFound();
          },
          success: function () {
            // Store user id in the user session
            req.session.me = user.id;
            req.session.user = user;
            // All done- let the client know that everything worked.
            delete user.encryptedPassword;
            return res.ok(user);
          }
        });
      });
    }
  },

  /**
   * UserController.logout()
   * Logout the current user
   *
   * @param  {Object}   req
   * @param  {Function} res
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
  }
  ,

  /**
   * UserController.signup()
   * Register a new user
   *
   * @param  {Object}   req
   * @param  {Function} req.param
   * @prop   {String}   username
   * @prop   {String}   password
   * @prop   {String}   address
   * @prop   {String}   phone
   * @prop   {String}   name
   * @prop   {String}   email
   * @param  {Function} res
   */
  signup: function (req, res) {
    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      // An unexpected error occurred.
      error: function (err) {
        return res.negotiate(err);
      },
      // OK.
      success: function (encryptedPassword) {
        // Build the URL of a gravatar image for a particular email address.
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function (err) {
            return res.negotiate(err);
          },
          success: function (gravatarUrl) {
            // find a default role to assign to a new user
            Role.findOne(2, function foundRole(err, role) {
              if (err) return res.negotiate(err);

              // If session refers to a user who no longer exists, still allow logout.
              if (!role) {
                sails.log.verbose('Session refers to a role that no longer exists.');
                return res.notFound();
              }

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
                phone: req.param('phone'),
                role: role,
                isApplyingForMerchant: req.param('isApplyingForMerchant') === true
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

                  if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                    && err.invalidAttributes.email[0].rule === 'email') {
                    return res.notValidEmail();
                  }

                  // If this is a uniqueness error about the username attribute,
                  // send back an easily parseable status code.
                  if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0]
                    && err.invalidAttributes.username[0].rule === 'unique') {
                    return res.usernameInUse();
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

            });
          }
        })
      }
    });
  }
  ,

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
    User.findOne(req.param('id')).exec(function (err, user){
      if (err) return res.negotiate(err);
      if (!user) return res.notFound('User not found.');
      if (user.role == 1) return res.forbidden('The action requested cannot be performed on this user.');
      var newRole = user.role == 3 ? 2 : 3;
      console.log('user'+user.role);
      console.log('newrole'+newRole);
      User.update(req.param('id'), {
        role: newRole,
        isApplyingForMerchant: false
      }).exec(function (err, user){
        if (err) return res.negotiate(err);
        var msg = user.role == 3 ? 'Merchant privilege has been granted for this user.' : 'Merchant privilege has been revoked from this user.';
        console.log('newly set role'+user.role);
        return res.ok(msg);
      });
    });
  },

  showUsers: function (req, res, next) {
    // Get an arraya of all users in the User collection(e.g. table)
    User.find().populate('role').exec(function foundUsers(err, users) {
        if (err) return next(err);
        // pass the array down to the /views/user/users.ejs page

        User.findOne(req.session.me, function foundUser(err, user) {
          if (err) return next(err);
          if (!user) return next();
          res.view(
            'user/users', {layout: 'layouts/loggedIn', me: user, users: users}
          );
        });
      }
    )
  },

  suspend: function (req, res) {
    // Look up the user record from the database which is
    // referenced by the id
    User.findOne(req.param('id')).exec(function foundUser(err, user) {
      if (user.role == 1) return res.forbidden('The action requested cannot be performed on this user.');
      else {
        var isSuspended;
        if (user.isSuspended === false ) {
          isSuspended = true;
        } else {
          isSuspended = false;
        }
        User.update({id: req.param('id')}, {isSuspended:isSuspended}).exec(function afterwards(err, updated){
          if (err) return res.negotiate(err);
          // If session refers to a user who no longer exists, still allow logout.
          if (!user) {
            sails.log.verbose('Session refers to a user who no longer exists.');
            return res.badRequest('Session refers to a user who no longer exists.');
          }
          console.log('Updated user to is suspended value = ' + updated[0].isSuspended);
        });

        // also ban the items from the suspended user
        res.json({createdBy:req.param('id'), isSuspended:isSuspended});
      }
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

