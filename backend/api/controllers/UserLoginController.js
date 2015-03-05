'use strict';

var _ = require('lodash');
var Promise = require("bluebird");

/**
 * UserLoginController
 *
 * @description :: Server-side logic for managing user login history data
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {
  statistics: function statistics(request, response) {
    var type = request.param('type');
    var groupBy;

    switch (type) {
      case 'Browser':
        groupBy = 'browser';
        break;
      case 'OS':
        groupBy = 'os';
        break;
      case 'User':
      default:
        groupBy = 'userId';
        break;
    }

    /**
     * Helper function to fetch main statistics data.
     *
     * @returns {Promise}
     */
    var fetchStatistics = function fetchStatistics() {
      return sails.models.userlogin
        .find({sum: 'count'})
        .groupBy(groupBy)
      ;
    };

    /**
     * Helper function to fetch user data. Note that this is only applied if action is 'User'
     *
     * @returns {Promise}
     */
    var fetchUsers = function fetchUsers() {
      return (groupBy === 'userId') ? sails.models.user.find() : [];
    };

    /**
     * Helper function to format current statistics data for high charts
     *
     * @param   {{
     *            stats: {}[],
     *            users: {}[]
     *          }}  data
     * @returns {array}
     */
    var formatData = function formatData(data) {
      return _.map(data.stats, function iterator(item) {
        return [
          (groupBy === 'userId') ? _findUser(item['user']) : item[groupBy],
          item.count
        ];
      });

      /**
       * Helper function to find user name.
       *
       * @param   {number}  userId
       * @returns {string}
       * @private
       */
      function _findUser(userId) {
        var user = _.find(data.users, function iterator(user) {
          return user.id === userId;
        });

        return user ? user.lastName + ', ' + user.firstName + ' (' + user.username + ')' : 'Unknown user';
      }
    };

    /**
     * Generic success handler which is triggered when all jobs are done and data is ready to sent to client.
     *
     * @param   {array} data  Data array to send to client
     */
    var handlerSuccess = function handlerSuccess(data) {
      response.ok(data);
    };

    /**
     * Generic error handler which is triggered whenever some error happens in jobs.
     *
     * @param   {*} error Error object
     */
    var handlerError = function handlerError(error) {
      response.negotiate(error);
    };

    // Fetch data and do the all necessary tricks :D
    Promise
      .props({
        stats: fetchStatistics(),
        users: fetchUsers()
      })
      .then(formatData)
      .then(handlerSuccess)
      .catch(handlerError)
    ;
  }
});
