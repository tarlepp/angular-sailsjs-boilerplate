/**
 * This file contains all necessary Angular service definitions for 'frontend.example.navigation' module.
 *
 * Note that this file should only contain services and nothing else.
 */
(function() {
    'use strict';

    /**
     * Generic info modal service, that contains necessary functionality to configure and open specified info modal.
     * These info modals are just for generic documentation for each GUI that is implemented to application.
     */
    angular.module('frontend.example.navigation')
        .factory('NavigationInfoModalService',
            [
                '$modal',
                function($modal) {
                    var service = {
                        /**
                         * Current title, directory and template values that are used on service.open() function.
                         *
                         * @private
                         */
                        '_title': '',
                        '_directory': '',
                        '_template': '',

                        /**
                         * Setter method for title and section.
                         *
                         * @param   {String}    title       Title of the modal
                         * @param   {String}    directory   Directory where to find info template
                         * @param   {String}    template    Template prefix to use
                         */
                        'set': function set(title, directory, template) {
                            service._title = title;
                            service._directory = directory;
                            service._template = template;
                        },

                        /**
                         * Service function to open specified information modal of specified GUI in boilerplate
                         * application.
                         */
                        'open': function open() {
                            $modal.open({
                                templateUrl: '/frontend/navigation/help.html',
                                controller: 'NavigationModalController',
                                size: 'lg',
                                resolve: {
                                    '_title': function resolveTitle() {
                                        return service._title;
                                    },
                                    '_directory': function resolveDirectory() {
                                        return service._directory;
                                    },
                                    '_template': function resolveTemplate() {
                                        return service._template;
                                    }
                                }
                            });
                        }
                    };

                    return service;
                }
            ]
        );

    /**
     * Service which contains information about all used files (back- and frontend) within specified example page.
     * These files are shown in example page info modal, so that users can easily see what current example page is
     * using to do things.
     */
    angular.module('frontend.example.navigation')
        .factory('NavigationInfoModalFiles',
            [
                '_',
                function(
                    _
                ) {
                    /**
                     * Base url for code repository.
                     *
                     * @type {string}
                     */
                    var repository = 'https://github.com/tarlepp/angular-sailsjs-boilerplate/blob/master/';

                    /**
                     * Type configuration for files.
                     *
                     * @type    {{
                     *              generic: {
                     *                  controller: string,
                     *                  data: string,
                     *                  model: string,
                     *                  template: string
                     *              },
                     *              backend: {
                     *                  baseController: string,
                     *                  baseModel: string
                     *              },
                     *              frontend: {
                     *                  module: string,
                     *                  listConfig: string
                     *              }
                     *          }}
                     */
                    var types = {
                        generic: {
                            controller: 'Used controller.',
                            data: 'Initial data that is loaded to database at first time that sails lift.',
                            model: 'Used model.',
                            template: 'Used HTML template.'
                        },
                        backend: {
                            baseController: 'Generic base controller that is extended by real controllers.',
                            baseModel: 'Generic base model that is extended by real models.',
                            policy: {
                                authenticated: 'Authentication policy that will check if request contains correct JWT or not.',
                                passport: 'Policy to initialize passport.js library to use.'
                            }
                        },
                        frontend: {
                            module: 'Current angular module configuration.',
                            modelFactory: 'Generic model factory that all individual models uses. This contains default functions for each model.',
                            dataService: 'Generic data service, which handles all the communications between back- and frontend via $sailsSocket service.',
                            listConfig: 'Service that contains all list specified configurations (title items, default configurations, etc.).',
                            backendConfig: 'Backend config, this contains backend url and other "static" backend specified definitions.',
                            authInterceptor: 'Authentication interceptor, that attach JWT to $http and $sailsSockets requests.',
                            errorInterceptor: 'Generic error interceptor, this will handle all error situations and shows those to user.',
                            directive: 'Used directive(s) in this example page.'
                        }
                    };

                    /**
                     * Generic files that are used across each GUI example.
                     *
                     * @type    {{}}
                     */
                    var generic = {
                        'backend': {
                            'Backend <span class="text-muted">generic</span>': [
                                {
                                    url: repository + 'backend/api/base/controller.js',
                                    title: 'controller.js',
                                    info: types.backend.baseController
                                },
                                {
                                    url: repository + 'backend/api/base/model.js',
                                    title: 'model.js',
                                    info: types.backend.baseModel
                                },
                                {
                                    url: repository + 'backend/api/policies/Authenticated.js',
                                    title: 'Authenticated.js',
                                    info: types.backend.policy.authenticated
                                },
                                {
                                    url: repository + 'backend/api/policies/Passport.js',
                                    title: 'Passport.js',
                                    info: types.backend.policy.passport
                                }
                            ]
                        },
                        'frontend': {
                            'Frontend <span class="text-muted">generic</span>': [
                                {
                                    url: repository + 'frontend/src/app/components/Services/ListConfigService.js',
                                    title: 'ListConfigService.js',
                                    info: types.frontend.listConfig
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Models/factory.js',
                                    title: 'factory.js',
                                    info: types.frontend.modelFactory
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Services/DataService.js',
                                    title: 'DataService.js',
                                    info: types.frontend.dataService
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Constants/BackendConfig.js',
                                    title: 'BackendConfig.js',
                                    info: types.frontend.backendConfig
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Interceptors/AuthInterceptor.js',
                                    title: 'AuthInterceptor.js',
                                    info: types.frontend.authInterceptor
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Interceptors/ErrorInterceptor.js',
                                    title: 'ErrorInterceptor.js',
                                    info: types.frontend.errorInterceptor
                                }
                            ]
                        }
                    };

                    /**
                     * Actual data for each example page. This data contains used files in each example GUI item, these
                     * files are grouped to following sections:
                     *  - backend
                     *  - backend (generic)
                     *  - frontend
                     *  - frontend (generic)
                     *
                     * @type    {{}}
                     */
                    var data = {
                        'book.list': {
                            'Backend': [
                                {
                                    url: repository + 'backend/api/models/Book.js',
                                    title: 'Book.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'backend/api/controllers/BookController.js',
                                    title: 'BookController.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'backend/test/fixtures/Book.json',
                                    title: 'Book.json',
                                    info: types.generic.data
                                }
                            ],
                            'Frontend': [
                                {
                                    url: repository + 'frontend/src/app/book/book.js',
                                    title: 'book.js',
                                    info: types.frontend.module
                                },
                                {
                                    url: repository + 'frontend/src/app/book/book-controllers.js',
                                    title: 'book-controllers.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'frontend/src/app/book/book-models.js',
                                    title: 'book-models.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'frontend/src/app/book/list.html',
                                    title: 'list.html',
                                    info: types.generic.template
                                }
                            ]
                        },
                        'author.list': {
                            'Backend': [
                                {
                                    url: repository + 'backend/api/models/Author.js',
                                    title: 'Author.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'backend/api/controllers/AuthorController.js',
                                    title: 'AuthorController.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'backend/test/fixtures/Author.json',
                                    title: 'Author.json',
                                    info: types.generic.data
                                }
                            ],
                            'Frontend': [
                                {
                                    url: repository + 'frontend/src/app/author/author.js',
                                    title: 'author.js',
                                    info: types.frontend.module
                                },
                                {
                                    url: repository + 'frontend/src/app/author/author-controllers.js',
                                    title: 'author-controllers.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'frontend/src/app/author/author-models.js',
                                    title: 'author-models.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'frontend/src/app/author/list.html',
                                    title: 'list.html',
                                    info: types.generic.template
                                }
                            ]
                        },
                        'messages.messages': {
                            'Frontend': [
                                {
                                    url: repository + 'frontend/src/app/messages/messages.js',
                                    title: 'messages.js',
                                    info: types.frontend.module
                                },
                                {
                                    url: repository + 'frontend/src/app/messages/messages-controllers.js',
                                    title: 'messages-controllers.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'frontend/src/app/messages/messages.html',
                                    title: 'messages.html',
                                    info: types.generic.template
                                }
                            ],
                            'Frontend <span class="text-muted">generic</span>': [
                                {
                                    url: repository + 'frontend/src/app/components/Interceptors/ErrorInterceptor.js',
                                    title: 'ErrorInterceptor.js',
                                    info: types.frontend.errorInterceptor
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Services/MessageService.js',
                                    title: 'MessageService.js',
                                    info: 'Service to show messages to users via <em>toastr</em> service.'
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Services/HttpStatus.js',
                                    title: 'HttpStatus.js',
                                    info: 'Generic HTTP status service that contains helper methods for HTTP status code handling.'
                                }
                            ]
                        },
                        'chat.chat': {
                            'Backend': [
                                {
                                    url: repository + 'backend/api/models/Message.js',
                                    title: 'Message.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'backend/api/controllers/MessageController.js',
                                    title: 'MessageController.js',
                                    info: types.generic.controller
                                }
                            ],
                            'Frontend': [
                                {
                                    url: repository + 'frontend/src/app/chat/chat.js',
                                    title: 'chat.js',
                                    info: types.frontend.module
                                },
                                {
                                    url: repository + 'frontend/src/app/chat/chat-controllers.js',
                                    title: 'chat-controllers.js',
                                    info: types.generic.controller
                                },
                                {
                                    url: repository + 'frontend/src/app/chat/chat-models.js',
                                    title: 'chat-models.js',
                                    info: types.generic.model
                                },
                                {
                                    url: repository + 'frontend/src/app/chat/chat-directives.js',
                                    title: 'chat-directives.js',
                                    info: types.frontend.directive
                                },
                                {
                                    url: repository + 'frontend/src/app/chat/chat.html',
                                    title: 'chat.html',
                                    info: types.generic.template
                                },
                                {
                                    url: repository + 'frontend/src/app/components/Directives/KeyPress.js',
                                    title: 'KeyPress.js',
                                    info: 'Key press directive.'
                                }
                            ]
                        }
                    };

                    return {
                        /**
                         * Service function to fetch all defined backend and frontend used files.
                         *
                         * @returns {{}}    All the file definitions
                         */
                        'getAll': function getAll() {
                            return data;
                        },
                        /**
                         * Service function to fetch specified GUI used backend and frontend used files.
                         *
                         * @param   {string}    directory
                         * @param   {string}    template
                         *
                         * @returns {{}}
                         */
                        'get': function(directory, template) {
                            var files = data[directory + '.' + template];

                            switch (directory + '.' + template) {
                                case 'book.list':
                                case 'author.list':
                                case 'chat.chat':
                                    files = _.merge(files, generic.backend, generic.frontend);
                                    break;
                                default:
                                    break;
                            }

                            return files;
                        }
                    };
                }
            ]
        );
}());
