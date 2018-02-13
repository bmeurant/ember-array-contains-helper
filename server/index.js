/* global module */
/* eslint-disable ember/use-ember-get-and-set */

module.exports = function(app) {
  app.get('/docs', function(req, res){
    res.redirect('/docs/index.html');
  });
};