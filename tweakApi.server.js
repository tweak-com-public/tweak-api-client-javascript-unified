/*jshint -W069 */
/**
 * Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
    at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
 * @class TweakApi
 * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
 * @param {string} [domainOrOptions.domain] - The project domain
 * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
 */
var TweakApi = (function() {
    'use strict';

    var request = require('request');
    var Q = require('q');

    function TweakApi(options) {
        var domain = (typeof options === 'object') ? options.domain : options;
        this.domain = domain ? domain : 'http://apidevcdn.tweak.com/api';
        if (this.domain.length === 0) {
            throw new Error('Domain parameter must be specified as a string.');
        }
        this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
    }

    TweakApi.prototype.request = function(method, url, parameters, body, headers, queryParameters, form, deferred) {
        var req = {
            method: method,
            uri: url,
            qs: queryParameters,
            headers: headers,
            body: body
        };
        if (Object.keys(form).length > 0) {
            req.form = form;
        }
        if (typeof(body) === 'object' && !(body instanceof Buffer)) {
            req.json = true;
        }
        request(req, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {}
                }
                if (response.statusCode === 204) {
                    deferred.resolve({
                        response: response
                    });
                } else if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });
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
     * @name TweakApi#getUsersByIdAccessTokensByFk
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     * 
     */
    TweakApi.prototype.getUsersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteUsersByIdAccessTokensByFk
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     * 
     */
    TweakApi.prototype.deleteUsersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putUsersByIdAccessTokensByFk
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putUsersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersByIdAccessTokens
     * @param {string} id - User id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getUsersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersByIdAccessTokens
     * @param {string} id - User id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postUsersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteUsersByIdAccessTokens
     * @param {string} id - User id
     * 
     */
    TweakApi.prototype.deleteUsersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersByIdAccessTokensCount
     * @param {string} id - User id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getUsersByIdAccessTokensCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putUsers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.putUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchUsers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.patchUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsers
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getUsers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersReplaceOrCreate
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postUsersReplaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postUsersUpsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersByIdExists
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.getUsersByIdExists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#headUsersById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.headUsersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     * 
     */
    TweakApi.prototype.getUsersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteUsersById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.deleteUsersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putUsersById
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.putUsersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchUsersById
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.patchUsersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postUsersByIdReplace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getUsersFindOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postUsersUpdate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersCount
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getUsersCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postUsersChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getUsersChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersLogin
     * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} include - Related objects to include in the response. See the description of return value for more details.
     * 
     */
    TweakApi.prototype.postUsersLogin = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersLogout
     * 
     */
    TweakApi.prototype.postUsersLogout = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getUsersConfirm
     * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getUsersConfirm = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postUsersReset
     * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postUsersReset = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getMessagesGreet
     * @param {string} msg - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getMessagesGreet = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdAccessTokensByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     * 
     */
    TweakApi.prototype.getCustomersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCustomersByIdAccessTokensByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     * 
     */
    TweakApi.prototype.deleteCustomersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCustomersByIdAccessTokensByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putCustomersByIdAccessTokensByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdDesignsByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     * 
     */
    TweakApi.prototype.getCustomersByIdDesignsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCustomersByIdDesignsByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     * 
     */
    TweakApi.prototype.deleteCustomersByIdDesignsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCustomersByIdDesignsByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putCustomersByIdDesignsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdAccessTokens
     * @param {string} id - Customer id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCustomersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersByIdAccessTokens
     * @param {string} id - Customer id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCustomersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCustomersByIdAccessTokens
     * @param {string} id - Customer id
     * 
     */
    TweakApi.prototype.deleteCustomersByIdAccessTokens = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdAccessTokensCount
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getCustomersByIdAccessTokensCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdDesigns
     * @param {string} id - Customer id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCustomersByIdDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersByIdDesigns
     * @param {string} id - Customer id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCustomersByIdDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCustomersByIdDesigns
     * @param {string} id - Customer id
     * 
     */
    TweakApi.prototype.deleteCustomersByIdDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdDesignsCount
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getCustomersByIdDesignsCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCustomers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCustomers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.putCustomers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchCustomers
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.patchCustomers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomers
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getCustomers = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersReplaceOrCreate
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCustomersReplaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postCustomersUpsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersByIdExists
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.getCustomersByIdExists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#headCustomersById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.headCustomersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     * 
     */
    TweakApi.prototype.getCustomersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCustomersById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.deleteCustomersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCustomersById
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.putCustomersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchCustomersById
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.patchCustomersById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCustomersByIdReplace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getCustomersFindOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postCustomersUpdate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersCount
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getCustomersCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCustomersChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCustomersChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersLogin
     * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} include - Related objects to include in the response. See the description of return value for more details.
     * 
     */
    TweakApi.prototype.postCustomersLogin = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersLogout
     * 
     */
    TweakApi.prototype.postCustomersLogout = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCustomersConfirm
     * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCustomersConfirm = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCustomersReset
     * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCustomersReset = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdCustomer
     * @param {string} id - Design id
     * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getDesignsByIdCustomer = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdTagsByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     * 
     */
    TweakApi.prototype.getDesignsByIdTagsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteDesignsByIdTagsByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     * 
     */
    TweakApi.prototype.deleteDesignsByIdTagsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putDesignsByIdTagsByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putDesignsByIdTagsByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdCategoriesByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     * 
     */
    TweakApi.prototype.getDesignsByIdCategoriesByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteDesignsByIdCategoriesByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     * 
     */
    TweakApi.prototype.deleteDesignsByIdCategoriesByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putDesignsByIdCategoriesByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putDesignsByIdCategoriesByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdTags
     * @param {string} id - Design id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getDesignsByIdTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsByIdTags
     * @param {string} id - Design id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postDesignsByIdTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteDesignsByIdTags
     * @param {string} id - Design id
     * 
     */
    TweakApi.prototype.deleteDesignsByIdTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdTagsCount
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getDesignsByIdTagsCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdCategories
     * @param {string} id - Design id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getDesignsByIdCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsByIdCategories
     * @param {string} id - Design id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postDesignsByIdCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteDesignsByIdCategories
     * @param {string} id - Design id
     * 
     */
    TweakApi.prototype.deleteDesignsByIdCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdCategoriesCount
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getDesignsByIdCategoriesCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesigns
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putDesigns
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.putDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchDesigns
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.patchDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesigns
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getDesigns = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsReplaceOrCreate
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postDesignsReplaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postDesignsUpsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsByIdExists
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.getDesignsByIdExists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#headDesignsById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.headDesignsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     * 
     */
    TweakApi.prototype.getDesignsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteDesignsById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.deleteDesignsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putDesignsById
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.putDesignsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchDesignsById
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.patchDesignsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postDesignsByIdReplace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getDesignsFindOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postDesignsUpdate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsCount
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getDesignsCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postDesignsChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postDesignsChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getDesignsChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getDesignsChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTags
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putTags
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.putTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchTags
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.patchTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTags
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getTags = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTagsReplaceOrCreate
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postTagsReplaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTagsUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postTagsUpsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTagsByIdExists
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.getTagsByIdExists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#headTagsById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.headTagsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTagsById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     * 
     */
    TweakApi.prototype.getTagsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteTagsById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.deleteTagsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putTagsById
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.putTagsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchTagsById
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.patchTagsById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTagsByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postTagsByIdReplace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTagsFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getTagsFindOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTagsUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postTagsUpdate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTagsCount
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getTagsCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postTagsChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postTagsChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getTagsChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getTagsChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesByIdChildrenByFk
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     * 
     */
    TweakApi.prototype.getCategoriesByIdChildrenByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCategoriesByIdChildrenByFk
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     * 
     */
    TweakApi.prototype.deleteCategoriesByIdChildrenByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCategoriesByIdChildrenByFk
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.putCategoriesByIdChildrenByFk = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesByIdParent
     * @param {string} id - Category id
     * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCategoriesByIdParent = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesByIdChildren
     * @param {string} id - Category id
     * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCategoriesByIdChildren = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesByIdChildren
     * @param {string} id - Category id
     * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCategoriesByIdChildren = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCategoriesByIdChildren
     * @param {string} id - Category id
     * 
     */
    TweakApi.prototype.deleteCategoriesByIdChildren = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesByIdChildrenCount
     * @param {string} id - Category id
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getCategoriesByIdChildrenCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategories
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCategories
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.putCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchCategories
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.patchCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategories
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getCategories = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesReplaceOrCreate
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCategoriesReplaceOrCreate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postCategoriesUpsertWithWhere = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesByIdExists
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.getCategoriesByIdExists = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#headCategoriesById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.headCategoriesById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     * 
     */
    TweakApi.prototype.getCategoriesById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#deleteCategoriesById
     * @param {string} id - Model id
     * 
     */
    TweakApi.prototype.deleteCategoriesById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#putCategoriesById
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.putCategoriesById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#patchCategoriesById
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.patchCategoriesById = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     * 
     */
    TweakApi.prototype.postCategoriesByIdReplace = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     * 
     */
    TweakApi.prototype.getCategoriesFindOne = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     * 
     */
    TweakApi.prototype.postCategoriesUpdate = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesCount
     * @param {string} where - Criteria to match model instances
     * 
     */
    TweakApi.prototype.getCategoriesCount = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#postCategoriesChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.postCategoriesChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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
     * @name TweakApi#getCategoriesChangeStream
     * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
     * 
     */
    TweakApi.prototype.getCategoriesChangeStream = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

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

exports.TweakApi = TweakApi;