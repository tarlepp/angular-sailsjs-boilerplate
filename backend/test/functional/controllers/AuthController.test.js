'use strict';

var request = require( 'supertest' );
var expect = require( 'chai' ).expect;
var login = require( "./../../helpers/login" );
var _ = require( 'lodash' );
var Barrels = require( 'barrels' );
var barrels = new Barrels();
var fixtures = barrels.data;

describe.only( '*** AuthController', function AuthController () {
    describe( ' - action login', function loginTest () {
        [
            {
                condition:'null login payload',
                payload  :null,
                status   :401
            },
            {
                condition:'empty string "" login payload',
                payload  :'',
                status   :401
            },
            {
                condition:'dummy string "foobar" login payload',
                payload  :'foobar',
                status   :401
            },
            {
                condition:'empty object {} login payload',
                payload  :{},
                status   :401
            },
            {
                condition:'empty string "" identifier and empty string "" password',
                payload  :{
                    identifier:'',
                    password  :''
                },
                status   :401
            },
            {
                condition:'dummy string "foo" identifier and empty string "" password',
                payload  :{
                    identifier:'foo',
                    password  :''
                },
                status   :401
            },
            {
                condition:'empty string "" identifier and dummy string "bar" password',
                payload  :{
                    identifier:'',
                    password  :'bar'
                },
                status   :401
            },
            {
                condition:'dummy string "foo" identifier and dummy string "bar" password',
                payload  :{
                    identifier:'foo',
                    password  :'bar'
                },
                status   :401
            },
            {
                condition:'valid "demo" user username and password',
                payload  :{
                    identifier:'demo',
                    password  :'demodemodemo'
                },
                status   :200
            },
            {
                condition:'valid "admin" user username and password',
                payload  :{
                    identifier:'admin',
                    password:'adminadminadmin'
                },
                status   :200
            }
        ].forEach( function testCase ( testCase, index ) {
                describe( testCase.condition, function loginTest () {
                    it( 'should return ' + testCase.status + ' HTTP status', function it ( done ) {
                        request( sails.hooks.http.app )
                            .post( '/login' )
                            .send( testCase.payload )
                            .expect( testCase.status )
                            .end(
                            function ( error, result ) {
                                if ( error )
                                    {
                                        return done( error );
                                    }

                                expect( result.res.body ).to.be.a( 'object' );

                                done();
                            }
                        );
                    } );
                } );
            } );

        describe( 'after successfully login', function successfullyLogin () {
            beforeEach( function beforeEach ( done ) {
                barrels.populate( ['userlogin'], done );
            } );

            [
                {
                    condition: "using demo user credentials",
                    credential:'demo'
                },
                {
                    condition: "using admin user credentials",
                    credential:'admin'
                }
            ].forEach( function testCase ( testCase, index ) {
                    describe( testCase.condition, function loginTest () {
                        it( 'should write user login information to database', function it ( done ) {
                            login.authenticate( testCase.credential, function callback ( error ) {
                                if ( error )
                                    {
                                        return done( error );
                                    }

                                sails.models['userlogin']
                                    .find()
                                    .exec( function ( error, results ) {
                                        if ( error )
                                            {
                                                return done( error );
                                            }

                                        expect( results ).to.be.a( 'array' );
                                        expect( results ).to.have.length( 1 );

                                        done();
                                    } );
                            } );
                        } );
                    } );
                } );
        } );
    } );

    describe( ' - action logout', function logoutTest () {
        it( 'should return HTTP status 200', function it ( done ) {
            request( sails.hooks.http.app )
                .get( '/auth/logout' )
                .expect( 200 )
                .end(
                function end ( error, result ) {
                    if ( error )
                        {
                            return done( error );
                        }

                    expect( result.res.body ).to.be.true;

                    done();
                }
            );
        } );
    } );

    describe( ' - action checkPassword', function checkPasswordTest () {
        [
            {
                condition: "using demo user credentials",
                credential:'demo',
                password  :'demodemodemo'
            },
            {
                condition: "using admin user credentials",
                credential:'admin',
                password  :'adminadminadmin'
            }
        ].forEach( function testCase ( testCase, index ) {
                var token = '';

                before( function beforeTest ( done ) {
                    login.authenticate( testCase.credential, function callback ( error, result ) {
                        if ( !error )
                            {
                                token = result.token;
                            }

                        done( error );
                    } );
                } );

                describe( testCase.condition, function loginTest () {
                    describe( 'with invalid authorization header', function () {
                        it( 'should return HTTP status 401 with expected body', function it ( done ) {
                            request( sails.hooks.http.app )
                                .post( '/auth/checkPassword' )
                                .expect( 401 )
                                .end(
                                function end ( error, result ) {
                                    if ( error )
                                        {
                                            return done( error );
                                        }

                                    expect( result.res.body ).to.deep.equal( {message:'No authorization header was found'} );

                                    done();
                                }
                            );
                        } );
                    } );

                    describe( 'with valid authorization header', function () {
                        describe( 'and invalid password', function () {
                            it( 'should return HTTP status 401 with expected body', function it ( done ) {
                                request( sails.hooks.http.app )
                                    .post( '/auth/checkPassword' )
                                    .set( 'Authorization', 'bearer ' + token )
                                    .set( 'Content-Type', 'application/json' )
                                    .send( {password:"invalid password"} )
                                    .expect( 400 )
                                    .end(
                                    function end ( error, result ) {
                                        if ( error )
                                            {
                                                return done( error );
                                            }

                                        expect( result.res.body ).to.deep.equal( {message:'Given password does not match.'} );

                                        done();
                                    }
                                );
                            } );
                        } );

                        describe( 'and valid password', function () {
                            it( 'should return HTTP status 200 with expected body', function it ( done ) {
                                request( sails.hooks.http.app )
                                    .post( '/auth/checkPassword' )
                                    .set( 'Authorization', 'bearer ' + token )
                                    .set( 'Content-Type', 'application/json' )
                                    .send( {password:testCase.password} )
                                    .expect( 200 )
                                    .end(
                                    function end ( error, result ) {
                                        if ( error )
                                            {
                                                return done( error );
                                            }

                                        expect( result.res.body ).to.be.true;

                                        done();
                                    }
                                );
                            } );
                        } );
                    } );
                } );
            } )
    } );
} );
