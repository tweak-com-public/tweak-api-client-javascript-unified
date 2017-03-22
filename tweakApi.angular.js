/*jshint -W069 */
/*global angular:false */
angular.module('', [])
    .factory('TweakApi', ['$q', '$http', '$rootScope', function($q, $http, $rootScope) {
        'use strict';

        /**
         * Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @class TweakApi
         * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
         * @param {string} [domainOrOptions.domain] - The project domain
         * @param {string} [domainOrOptions.cache] - An angularjs cache implementation
         * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
         * @param {string} [cache] - An angularjs cache implementation
         */
        var TweakApi = (function() {
            function TweakApi(options, cache) {
                var domain = (typeof options === 'object') ? options.domain : options;
                this.domain = typeof(domain) === 'string' ? domain : '';
                if (this.domain.length === 0) {
                    throw new Error('Domain parameter must be specified as a string.');
                }
                cache = cache || ((typeof options === 'object') ? options.cache : cache);
                this.cache = cache;
                this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
            }

            TweakApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
                var options = {
                    timeout: parameters.$timeout,
                    method: method,
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = TweakApi.transformRequest;
                }
                $http(options)
                    .then(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
                    })
                    .catch(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

            };

            TweakApi.prototype.$on = function($scope, path, handler) {
                var url = this.domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            TweakApi.prototype.$broadcast = function(path) {
                var url = this.domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            TweakApi.transformRequest = function(obj) {
                var str = [];
                for (var p in obj) {
                    var val = obj[p];
                    if (angular.isArray(val)) {
                        val.forEach(function(val) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                        });
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                    }
                }
                return str.join("&");
            };

            /**
             * Set Token
             * @method
             * @name TweakApi#setToken
             * @param {string} value - token's value
             * @param {string} headerOrQueryName - the header or query name to send the token at
             * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
             *
             */
            TweakApi.prototype.setToken = function(value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };

            /**
             * Find a related item by id for accessTokens.
             * @method
             * @name TweakApi#User_prototype___findById__accessTokens
             * @param {string} id - User id
             * @param {string} fk - Foreign key for accessTokens
             * 
             */
            TweakApi.prototype.User_prototype___findById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for accessTokens.
             * @method
             * @name TweakApi#User_prototype___destroyById__accessTokens
             * @param {string} id - User id
             * @param {string} fk - Foreign key for accessTokens
             * 
             */
            TweakApi.prototype.User_prototype___destroyById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for accessTokens.
             * @method
             * @name TweakApi#User_prototype___updateById__accessTokens
             * @param {string} id - User id
             * @param {string} fk - Foreign key for accessTokens
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_prototype___updateById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries accessTokens of User.
             * @method
             * @name TweakApi#User_prototype___get__accessTokens
             * @param {string} id - User id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_prototype___get__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in accessTokens of this model.
             * @method
             * @name TweakApi#User_prototype___create__accessTokens
             * @param {string} id - User id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_prototype___create__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all accessTokens of this model.
             * @method
             * @name TweakApi#User_prototype___delete__accessTokens
             * @param {string} id - User id
             * 
             */
            TweakApi.prototype.User_prototype___delete__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts accessTokens of User.
             * @method
             * @name TweakApi#User_prototype___count__accessTokens
             * @param {string} id - User id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.User_prototype___count__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/accessTokens/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a new instance of the model and persist it into the data source.
             * @method
             * @name TweakApi#User_create
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.User_create = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#User_upsert__put_Users
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.User_upsert__put_Users = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#User_upsert__patch_Users
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.User_upsert__patch_Users = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find all instances of the model matched by filter from the data source.
             * @method
             * @name TweakApi#User_find
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.User_find = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#User_replaceOrCreate
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.User_replaceOrCreate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/replaceOrCreate';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             * @method
             * @name TweakApi#User_upsertWithWhere
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.User_upsertWithWhere = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/upsertWithWhere';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#User_exists__get_Users__id__exists
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.User_exists__get_Users__id__exists = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/exists';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#User_exists__head_Users__id_
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.User_exists__head_Users__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#User_findById
             * @param {string} id - Model id
             * @param {string} filter - Filter defining fields and include
             * 
             */
            TweakApi.prototype.User_findById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#User_deleteById
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.User_deleteById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#User_prototype_updateAttributes__put_Users__id_
             * @param {string} id - User id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.User_prototype_updateAttributes__put_Users__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#User_prototype_updateAttributes__patch_Users__id_
             * @param {string} id - User id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.User_prototype_updateAttributes__patch_Users__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#User_replaceById
             * @param {string} id - Model id
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.User_replaceById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/{id}/replace';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find first instance of the model matched by filter from the data source.
             * @method
             * @name TweakApi#User_findOne
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.User_findOne = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/findOne';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update instances of the model matched by {{where}} from the data source.
             * @method
             * @name TweakApi#User_updateAll
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.User_updateAll = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/update';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Count instances of the model matched by where from the data source.
             * @method
             * @name TweakApi#User_count
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.User_count = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#User_createChangeStream__post_Users_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_createChangeStream__post_Users_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    form['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#User_createChangeStream__get_Users_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_createChangeStream__get_Users_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    queryParameters['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Login a user with username/email and password.
             * @method
             * @name TweakApi#User_login
             * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} include - Related objects to include in the response. See the description of return value for more details.
             * 
             */
            TweakApi.prototype.User_login = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/login';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['credentials'] !== undefined) {
                    body = parameters['credentials'];
                }

                if (parameters['credentials'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: credentials'));
                    return deferred.promise;
                }

                if (parameters['include'] !== undefined) {
                    queryParameters['include'] = parameters['include'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Logout a user with access token.
             * @method
             * @name TweakApi#User_logout
             * 
             */
            TweakApi.prototype.User_logout = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/logout';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Confirm a user registration with email verification token.
             * @method
             * @name TweakApi#User_confirm
             * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_confirm = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/confirm';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['uid'] !== undefined) {
                    queryParameters['uid'] = parameters['uid'];
                }

                if (parameters['uid'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: uid'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: token'));
                    return deferred.promise;
                }

                if (parameters['redirect'] !== undefined) {
                    queryParameters['redirect'] = parameters['redirect'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Reset password for a user with email.
             * @method
             * @name TweakApi#User_resetPassword
             * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.User_resetPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Users/reset';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    body = parameters['options'];
                }

                if (parameters['options'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: options'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * 
             * @method
             * @name TweakApi#Message_greet
             * @param {string} msg - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Message_greet = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Messages/greet';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['msg'] !== undefined) {
                    queryParameters['msg'] = parameters['msg'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a related item by id for accessTokens.
             * @method
             * @name TweakApi#Customer_prototype___findById__accessTokens
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for accessTokens
             * 
             */
            TweakApi.prototype.Customer_prototype___findById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for accessTokens.
             * @method
             * @name TweakApi#Customer_prototype___destroyById__accessTokens
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for accessTokens
             * 
             */
            TweakApi.prototype.Customer_prototype___destroyById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for accessTokens.
             * @method
             * @name TweakApi#Customer_prototype___updateById__accessTokens
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for accessTokens
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___updateById__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a related item by id for designs.
             * @method
             * @name TweakApi#Customer_prototype___findById__designs
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for designs
             * 
             */
            TweakApi.prototype.Customer_prototype___findById__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for designs.
             * @method
             * @name TweakApi#Customer_prototype___destroyById__designs
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for designs
             * 
             */
            TweakApi.prototype.Customer_prototype___destroyById__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for designs.
             * @method
             * @name TweakApi#Customer_prototype___updateById__designs
             * @param {string} id - Customer id
             * @param {string} fk - Foreign key for designs
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___updateById__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries accessTokens of Customer.
             * @method
             * @name TweakApi#Customer_prototype___get__accessTokens
             * @param {string} id - Customer id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___get__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in accessTokens of this model.
             * @method
             * @name TweakApi#Customer_prototype___create__accessTokens
             * @param {string} id - Customer id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___create__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all accessTokens of this model.
             * @method
             * @name TweakApi#Customer_prototype___delete__accessTokens
             * @param {string} id - Customer id
             * 
             */
            TweakApi.prototype.Customer_prototype___delete__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts accessTokens of Customer.
             * @method
             * @name TweakApi#Customer_prototype___count__accessTokens
             * @param {string} id - Customer id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Customer_prototype___count__accessTokens = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/accessTokens/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries designs of Customer.
             * @method
             * @name TweakApi#Customer_prototype___get__designs
             * @param {string} id - Customer id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___get__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in designs of this model.
             * @method
             * @name TweakApi#Customer_prototype___create__designs
             * @param {string} id - Customer id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_prototype___create__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all designs of this model.
             * @method
             * @name TweakApi#Customer_prototype___delete__designs
             * @param {string} id - Customer id
             * 
             */
            TweakApi.prototype.Customer_prototype___delete__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts designs of Customer.
             * @method
             * @name TweakApi#Customer_prototype___count__designs
             * @param {string} id - Customer id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Customer_prototype___count__designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/designs/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a new instance of the model and persist it into the data source.
             * @method
             * @name TweakApi#Customer_create
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Customer_create = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Customer_upsert__put_Customers
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Customer_upsert__put_Customers = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Customer_upsert__patch_Customers
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Customer_upsert__patch_Customers = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find all instances of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Customer_find
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Customer_find = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Customer_replaceOrCreate
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Customer_replaceOrCreate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/replaceOrCreate';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             * @method
             * @name TweakApi#Customer_upsertWithWhere
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Customer_upsertWithWhere = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/upsertWithWhere';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Customer_exists__get_Customers__id__exists
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Customer_exists__get_Customers__id__exists = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/exists';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Customer_exists__head_Customers__id_
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Customer_exists__head_Customers__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Customer_findById
             * @param {string} id - Model id
             * @param {string} filter - Filter defining fields and include
             * 
             */
            TweakApi.prototype.Customer_findById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Customer_deleteById
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Customer_deleteById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Customer_prototype_updateAttributes__put_Customers__id_
             * @param {string} id - Customer id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Customer_prototype_updateAttributes__put_Customers__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Customer_prototype_updateAttributes__patch_Customers__id_
             * @param {string} id - Customer id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Customer_prototype_updateAttributes__patch_Customers__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Customer_replaceById
             * @param {string} id - Model id
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Customer_replaceById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/{id}/replace';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find first instance of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Customer_findOne
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Customer_findOne = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/findOne';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update instances of the model matched by {{where}} from the data source.
             * @method
             * @name TweakApi#Customer_updateAll
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Customer_updateAll = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/update';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Count instances of the model matched by where from the data source.
             * @method
             * @name TweakApi#Customer_count
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Customer_count = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Customer_createChangeStream__post_Customers_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_createChangeStream__post_Customers_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    form['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Customer_createChangeStream__get_Customers_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_createChangeStream__get_Customers_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    queryParameters['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Login a user with username/email and password.
             * @method
             * @name TweakApi#Customer_login
             * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} include - Related objects to include in the response. See the description of return value for more details.
             * 
             */
            TweakApi.prototype.Customer_login = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/login';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['credentials'] !== undefined) {
                    body = parameters['credentials'];
                }

                if (parameters['credentials'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: credentials'));
                    return deferred.promise;
                }

                if (parameters['include'] !== undefined) {
                    queryParameters['include'] = parameters['include'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Logout a user with access token.
             * @method
             * @name TweakApi#Customer_logout
             * 
             */
            TweakApi.prototype.Customer_logout = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/logout';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Confirm a user registration with email verification token.
             * @method
             * @name TweakApi#Customer_confirm
             * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_confirm = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/confirm';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['uid'] !== undefined) {
                    queryParameters['uid'] = parameters['uid'];
                }

                if (parameters['uid'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: uid'));
                    return deferred.promise;
                }

                if (parameters['token'] !== undefined) {
                    queryParameters['token'] = parameters['token'];
                }

                if (parameters['token'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: token'));
                    return deferred.promise;
                }

                if (parameters['redirect'] !== undefined) {
                    queryParameters['redirect'] = parameters['redirect'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Reset password for a user with email.
             * @method
             * @name TweakApi#Customer_resetPassword
             * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Customer_resetPassword = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Customers/reset';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    body = parameters['options'];
                }

                if (parameters['options'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: options'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Fetches belongsTo relation customer.
             * @method
             * @name TweakApi#Design_prototype___get__customer
             * @param {string} id - Design id
             * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___get__customer = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/customer';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['refresh'] !== undefined) {
                    queryParameters['refresh'] = parameters['refresh'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a related item by id for tags.
             * @method
             * @name TweakApi#Design_prototype___findById__tags
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for tags
             * 
             */
            TweakApi.prototype.Design_prototype___findById__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for tags.
             * @method
             * @name TweakApi#Design_prototype___destroyById__tags
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for tags
             * 
             */
            TweakApi.prototype.Design_prototype___destroyById__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for tags.
             * @method
             * @name TweakApi#Design_prototype___updateById__tags
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for tags
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___updateById__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a related item by id for categories.
             * @method
             * @name TweakApi#Design_prototype___findById__categories
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for categories
             * 
             */
            TweakApi.prototype.Design_prototype___findById__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for categories.
             * @method
             * @name TweakApi#Design_prototype___destroyById__categories
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for categories
             * 
             */
            TweakApi.prototype.Design_prototype___destroyById__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for categories.
             * @method
             * @name TweakApi#Design_prototype___updateById__categories
             * @param {string} id - Design id
             * @param {string} fk - Foreign key for categories
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___updateById__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries tags of Design.
             * @method
             * @name TweakApi#Design_prototype___get__tags
             * @param {string} id - Design id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___get__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in tags of this model.
             * @method
             * @name TweakApi#Design_prototype___create__tags
             * @param {string} id - Design id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___create__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all tags of this model.
             * @method
             * @name TweakApi#Design_prototype___delete__tags
             * @param {string} id - Design id
             * 
             */
            TweakApi.prototype.Design_prototype___delete__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts tags of Design.
             * @method
             * @name TweakApi#Design_prototype___count__tags
             * @param {string} id - Design id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Design_prototype___count__tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/tags/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries categories of Design.
             * @method
             * @name TweakApi#Design_prototype___get__categories
             * @param {string} id - Design id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___get__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in categories of this model.
             * @method
             * @name TweakApi#Design_prototype___create__categories
             * @param {string} id - Design id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_prototype___create__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all categories of this model.
             * @method
             * @name TweakApi#Design_prototype___delete__categories
             * @param {string} id - Design id
             * 
             */
            TweakApi.prototype.Design_prototype___delete__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts categories of Design.
             * @method
             * @name TweakApi#Design_prototype___count__categories
             * @param {string} id - Design id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Design_prototype___count__categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/categories/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a new instance of the model and persist it into the data source.
             * @method
             * @name TweakApi#Design_create
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Design_create = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Design_upsert__put_Designs
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Design_upsert__put_Designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Design_upsert__patch_Designs
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Design_upsert__patch_Designs = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find all instances of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Design_find
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Design_find = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Design_replaceOrCreate
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Design_replaceOrCreate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/replaceOrCreate';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             * @method
             * @name TweakApi#Design_upsertWithWhere
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Design_upsertWithWhere = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/upsertWithWhere';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Design_exists__get_Designs__id__exists
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Design_exists__get_Designs__id__exists = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/exists';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Design_exists__head_Designs__id_
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Design_exists__head_Designs__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Design_findById
             * @param {string} id - Model id
             * @param {string} filter - Filter defining fields and include
             * 
             */
            TweakApi.prototype.Design_findById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Design_deleteById
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Design_deleteById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Design_prototype_updateAttributes__put_Designs__id_
             * @param {string} id - Design id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Design_prototype_updateAttributes__put_Designs__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Design_prototype_updateAttributes__patch_Designs__id_
             * @param {string} id - Design id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Design_prototype_updateAttributes__patch_Designs__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Design_replaceById
             * @param {string} id - Model id
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Design_replaceById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/{id}/replace';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find first instance of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Design_findOne
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Design_findOne = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/findOne';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update instances of the model matched by {{where}} from the data source.
             * @method
             * @name TweakApi#Design_updateAll
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Design_updateAll = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/update';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Count instances of the model matched by where from the data source.
             * @method
             * @name TweakApi#Design_count
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Design_count = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Design_createChangeStream__post_Designs_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_createChangeStream__post_Designs_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    form['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Design_createChangeStream__get_Designs_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Design_createChangeStream__get_Designs_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Designs/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    queryParameters['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a new instance of the model and persist it into the data source.
             * @method
             * @name TweakApi#Tag_create
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Tag_create = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Tag_upsert__put_Tags
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Tag_upsert__put_Tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Tag_upsert__patch_Tags
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Tag_upsert__patch_Tags = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find all instances of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Tag_find
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Tag_find = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Tag_replaceOrCreate
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Tag_replaceOrCreate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/replaceOrCreate';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             * @method
             * @name TweakApi#Tag_upsertWithWhere
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Tag_upsertWithWhere = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/upsertWithWhere';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Tag_exists__get_Tags__id__exists
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Tag_exists__get_Tags__id__exists = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}/exists';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Tag_exists__head_Tags__id_
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Tag_exists__head_Tags__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Tag_findById
             * @param {string} id - Model id
             * @param {string} filter - Filter defining fields and include
             * 
             */
            TweakApi.prototype.Tag_findById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Tag_deleteById
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Tag_deleteById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Tag_prototype_updateAttributes__put_Tags__id_
             * @param {string} id - Tag id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Tag_prototype_updateAttributes__put_Tags__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Tag_prototype_updateAttributes__patch_Tags__id_
             * @param {string} id - Tag id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Tag_prototype_updateAttributes__patch_Tags__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Tag_replaceById
             * @param {string} id - Model id
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Tag_replaceById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/{id}/replace';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find first instance of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Tag_findOne
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Tag_findOne = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/findOne';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update instances of the model matched by {{where}} from the data source.
             * @method
             * @name TweakApi#Tag_updateAll
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Tag_updateAll = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/update';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Count instances of the model matched by where from the data source.
             * @method
             * @name TweakApi#Tag_count
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Tag_count = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Tag_createChangeStream__post_Tags_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Tag_createChangeStream__post_Tags_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    form['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Tag_createChangeStream__get_Tags_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Tag_createChangeStream__get_Tags_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Tags/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    queryParameters['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a related item by id for children.
             * @method
             * @name TweakApi#Category_prototype___findById__children
             * @param {string} id - Category id
             * @param {string} fk - Foreign key for children
             * 
             */
            TweakApi.prototype.Category_prototype___findById__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a related item by id for children.
             * @method
             * @name TweakApi#Category_prototype___destroyById__children
             * @param {string} id - Category id
             * @param {string} fk - Foreign key for children
             * 
             */
            TweakApi.prototype.Category_prototype___destroyById__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update a related item by id for children.
             * @method
             * @name TweakApi#Category_prototype___updateById__children
             * @param {string} id - Category id
             * @param {string} fk - Foreign key for children
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_prototype___updateById__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children/{fk}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                path = path.replace('{fk}', parameters['fk']);

                if (parameters['fk'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: fk'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Fetches belongsTo relation parent.
             * @method
             * @name TweakApi#Category_prototype___get__parent
             * @param {string} id - Category id
             * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_prototype___get__parent = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/parent';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['refresh'] !== undefined) {
                    queryParameters['refresh'] = parameters['refresh'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Queries children of Category.
             * @method
             * @name TweakApi#Category_prototype___get__children
             * @param {string} id - Category id
             * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_prototype___get__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Creates a new instance in children of this model.
             * @method
             * @name TweakApi#Category_prototype___create__children
             * @param {string} id - Category id
             * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_prototype___create__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Deletes all children of this model.
             * @method
             * @name TweakApi#Category_prototype___delete__children
             * @param {string} id - Category id
             * 
             */
            TweakApi.prototype.Category_prototype___delete__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Counts children of Category.
             * @method
             * @name TweakApi#Category_prototype___count__children
             * @param {string} id - Category id
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Category_prototype___count__children = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/children/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a new instance of the model and persist it into the data source.
             * @method
             * @name TweakApi#Category_create
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Category_create = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Category_upsert__put_Categories
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Category_upsert__put_Categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Category_upsert__patch_Categories
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Category_upsert__patch_Categories = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find all instances of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Category_find
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Category_find = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace an existing model instance or insert a new one into the data source.
             * @method
             * @name TweakApi#Category_replaceOrCreate
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Category_replaceOrCreate = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/replaceOrCreate';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             * @method
             * @name TweakApi#Category_upsertWithWhere
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Category_upsertWithWhere = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/upsertWithWhere';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Category_exists__get_Categories__id__exists
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Category_exists__get_Categories__id__exists = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/exists';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Check whether a model instance exists in the data source.
             * @method
             * @name TweakApi#Category_exists__head_Categories__id_
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Category_exists__head_Categories__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('HEAD', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Category_findById
             * @param {string} id - Model id
             * @param {string} filter - Filter defining fields and include
             * 
             */
            TweakApi.prototype.Category_findById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Delete a model instance by {{id}} from the data source.
             * @method
             * @name TweakApi#Category_deleteById
             * @param {string} id - Model id
             * 
             */
            TweakApi.prototype.Category_deleteById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('DELETE', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Category_prototype_updateAttributes__put_Categories__id_
             * @param {string} id - Category id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Category_prototype_updateAttributes__put_Categories__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PUT', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Patch attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Category_prototype_updateAttributes__patch_Categories__id_
             * @param {string} id - Category id
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Category_prototype_updateAttributes__patch_Categories__id_ = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('PATCH', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Replace attributes for a model instance and persist it into the data source.
             * @method
             * @name TweakApi#Category_replaceById
             * @param {string} id - Model id
             * @param {} data - Model instance data
             * 
             */
            TweakApi.prototype.Category_replaceById = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/{id}/replace';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                path = path.replace('{id}', parameters['id']);

                if (parameters['id'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: id'));
                    return deferred.promise;
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Find first instance of the model matched by filter from the data source.
             * @method
             * @name TweakApi#Category_findOne
             * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
             * 
             */
            TweakApi.prototype.Category_findOne = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/findOne';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['filter'] !== undefined) {
                    queryParameters['filter'] = parameters['filter'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Update instances of the model matched by {{where}} from the data source.
             * @method
             * @name TweakApi#Category_updateAll
             * @param {string} where - Criteria to match model instances
             * @param {} data - An object of model property name/value pairs
             * 
             */
            TweakApi.prototype.Category_updateAll = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/update';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters['data'] !== undefined) {
                    body = parameters['data'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Count instances of the model matched by where from the data source.
             * @method
             * @name TweakApi#Category_count
             * @param {string} where - Criteria to match model instances
             * 
             */
            TweakApi.prototype.Category_count = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/count';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['where'] !== undefined) {
                    queryParameters['where'] = parameters['where'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Category_createChangeStream__post_Categories_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_createChangeStream__post_Categories_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    form['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('POST', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };
            /**
             * Create a change stream.
             * @method
             * @name TweakApi#Category_createChangeStream__get_Categories_change_stream
             * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
                at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
             * 
             */
            TweakApi.prototype.Category_createChangeStream__get_Categories_change_stream = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/Categories/change-stream';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (this.token.isQuery) {
                    queryParameters[this.token.headerOrQueryName] = this.token.value;
                } else if (this.token.headerOrQueryName) {
                    headers[this.token.headerOrQueryName] = this.token.value;
                } else {
                    headers['Authorization'] = 'Bearer ' + this.token.value;
                }

                headers['Content-Type'] = ['application/json,application/x-www-form-urlencoded,application/xml,text/xml'];

                if (parameters['options'] !== undefined) {
                    queryParameters['options'] = parameters['options'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                this.request('GET', domain + path, parameters, body, headers, queryParameters, form, deferred);

                return deferred.promise;
            };

            return TweakApi;
        })();

        return TweakApi;
    }]);