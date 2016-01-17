/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  showHomePage: function (req, res) {
    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('homepage', {me: null});
    //}
    //if (!req.session.me) {
    //  Item.find().limit(15).exec(function (err, items){
    //    if (err) return res.negotiate(err);
    //    return res.view('index', {layout: 'layouts/default_neo', me: null, items: items});
    //  });
    } else {
      // Otherwise, look up the logged-in user and show the logged-in view,
      // bootstrapping basic user data in the HTML sent from the server
      User.findOne(req.session.me, function (err, user){
        if (err) {
          return res.negotiate(err);
        }
        if (!user) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.view('homepage');
        }
        return res.view('dashboard', {me: user});
      });
    }
  }
};

