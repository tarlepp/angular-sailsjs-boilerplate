module.exports = function ( sails ) {

  return {

//    configure:function () {
//      // opportunity to do hook configuration here
//      sails.log.info('load-db hook configuration done');
//    },

    initialize:function ( cb ) {

      sails.after( 'hook:orm:loaded', function () {
        sails.services['database'].init(cb);
      } );
      // sails.log.info('load-db hook initialized');
    }
  }

}