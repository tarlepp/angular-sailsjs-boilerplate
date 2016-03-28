'use strict';

/**
 * Policy to check if current user is the owner of the target object, or a registered administrator
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 *
 * @returns {*}
 */
module.exports = function isOwner(req, res, next) {
  sails.log.verbose(__filename + ':' +__line + ' [Policy.isOwner() called]');

  var modelType = req.options.model;
  sails.models[modelType]
    .findOne(req.query.id)
    .exec(function(error, model) {
      if(error) {
        next(error);
      }

      if(req.token != model.user) {
        sails.models['user']
          .findOne(req.token)
          .then(function (user) {
            if (!user) {
              error = new Error();

              error.status = 401;
              error.message = 'User not found - Please login.';

              return res.json(error);
            } else if (user.admin) {
              next();
            } else {
              error = new Error();

              error.status = 403;
              error.message = 'Forbidden - You are not an authorized user.';
              return res.json(error);
            }
          })
          .catch(function (error) {
            next(error);
          })
      }

      else {
        next();
      }
    });
};
