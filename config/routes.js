/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 * @namespace Configuration
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  'GET /': 'PageController.showHomePage',


  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

  /*
   * API routes here
   * Custom API routes always return JSON. Default blueprints are also available.
   */
  // User routes
  'GET /signup': { view: 'signup' },
  'POST /signup': 'UserController.signup',
  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',
  'GET /showUsers': 'UserController.showUsers',
  'POST /user/edit': 'UserController.edit',
  'GET /user/setMerchant/:id': 'UserController.setMerchant',
  'GET /user/suspend/:id': 'UserController.suspend',
  'GET /myOrder': { view: 'user/myOrder' },
  // Item routes
  'GET /products': 'ItemController.showProducts',
  'GET /addItem': 'ItemController.addItem',
  'POST /addItem': 'ItemController.submit',
  'POST /item/ban': 'ItemController.banItem',
  'GET /cart': {
    view: 'user/cart'
  },
  'POST /purchase': 'OrderController.prepare',
  'GET /success': { view: 'user/success' },
  /*
   * Web routes here
   * Web routes always returns a view.
   */
  'GET /item/:id': 'ItemController.info',
  'GET /order/:id': 'OrderController.info',
  'GET /user/edit': 'UserController.getEditView',
  'GET /profile': 'UserController.showProfile',
  'GET /user/:username': 'UserController.info'

}
;
