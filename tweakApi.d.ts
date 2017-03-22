/// <reference path="../../typings/tsd.d.ts" />

import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type x - any = any;
type AccessToken = any;
type User = any;
type Design = any;
type Customer = any;
type Tag = any;
type Category = any;

type Logger = {
    log: (line: string) => any
};

/**
 * Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
    at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
 * @class TweakApi
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class TweakApi {

    private domain: string = "http://apidevcdn.tweak.com/api";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    getUsersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for accessTokens.
     * @method
     * @name TweakApi#getUsersByIdAccessTokensByFk
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     */
    getUsersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteUsersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for accessTokens.
     * @method
     * @name TweakApi#deleteUsersByIdAccessTokensByFk
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     */
    deleteUsersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putUsersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for accessTokens.
    * @method
    * @name TweakApi#putUsersByIdAccessTokensByFk
         * @param {string} id - User id
         * @param {string} fk - Foreign key for accessTokens
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putUsersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersByIdAccessTokensURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries accessTokens of User.
    * @method
    * @name TweakApi#getUsersByIdAccessTokens
         * @param {string} id - User id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getUsersByIdAccessTokens(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersByIdAccessTokensURL(parameters: {
        'id': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in accessTokens of this model.
    * @method
    * @name TweakApi#postUsersByIdAccessTokens
         * @param {string} id - User id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postUsersByIdAccessTokens(parameters: {
        'id': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteUsersByIdAccessTokensURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all accessTokens of this model.
     * @method
     * @name TweakApi#deleteUsersByIdAccessTokens
     * @param {string} id - User id
     */
    deleteUsersByIdAccessTokens(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersByIdAccessTokensCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts accessTokens of User.
     * @method
     * @name TweakApi#getUsersByIdAccessTokensCount
     * @param {string} id - User id
     * @param {string} where - Criteria to match model instances
     */
    getUsersByIdAccessTokensCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/accessTokens/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersURL(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name TweakApi#postUsers
     * @param {} data - Model instance data
     */
    postUsers(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putUsersURL(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#putUsers
     * @param {} data - Model instance data
     */
    putUsers(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchUsersURL(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#patchUsers
     * @param {} data - Model instance data
     */
    patchUsers(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getUsers
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getUsers(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersReplaceOrCreateURL(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/replaceOrCreate';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#postUsersReplaceOrCreate
     * @param {} data - Model instance data
     */
    postUsersReplaceOrCreate(parameters: {
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/replaceOrCreate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersUpsertWithWhereURL(parameters: {
        'where' ? : string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/upsertWithWhere';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name TweakApi#postUsersUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postUsersUpsertWithWhere(parameters: {
        'where' ? : string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/upsertWithWhere';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersByIdExistsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/exists';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#getUsersByIdExists
     * @param {string} id - Model id
     */
    getUsersByIdExists(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/exists';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    headUsersByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#headUsersById
     * @param {string} id - Model id
     */
    headUsersById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('HEAD', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersByIdURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#getUsersById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    getUsersById(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteUsersByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#deleteUsersById
     * @param {string} id - Model id
     */
    deleteUsersById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putUsersByIdURL(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#putUsersById
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     */
    putUsersById(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchUsersByIdURL(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#patchUsersById
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     */
    patchUsersById(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersByIdReplaceURL(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/replace';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#postUsersByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    postUsersByIdReplace(parameters: {
        'id': string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/{id}/replace';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersFindOneURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/findOne';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getUsersFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getUsersFindOne(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/findOne';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersUpdateURL(parameters: {
        'where' ? : string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/update';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name TweakApi#postUsersUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postUsersUpdate(parameters: {
        'where' ? : string,
        'data' ? : User,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/update';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersCountURL(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/count';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name TweakApi#getUsersCount
     * @param {string} where - Criteria to match model instances
     */
    getUsersCount(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/change-stream';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#postUsersChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postUsersChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                form['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/change-stream';
        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#getUsersChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getUsersChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                queryParameters['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersLoginURL(parameters: {
        'credentials': {},
        'include' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/login';

        if (parameters['include'] !== undefined) {
            queryParameters['include'] = parameters['include'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Login a user with username/email and password.
    * @method
    * @name TweakApi#postUsersLogin
         * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} include - Related objects to include in the response. See the description of return value for more details.
    */
    postUsersLogin(parameters: {
        'credentials': {},
        'include' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/login';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['credentials'] !== undefined) {
                body = parameters['credentials'];
            }

            if (parameters['credentials'] === undefined) {
                reject(new Error('Missing required  parameter: credentials'));
                return;
            }

            if (parameters['include'] !== undefined) {
                queryParameters['include'] = parameters['include'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersLogoutURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/logout';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Logout a user with access token.
     * @method
     * @name TweakApi#postUsersLogout
     */
    postUsersLogout(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/logout';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getUsersConfirmURL(parameters: {
        'uid': string,
        'token': string,
        'redirect' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/confirm';
        if (parameters['uid'] !== undefined) {
            queryParameters['uid'] = parameters['uid'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['redirect'] !== undefined) {
            queryParameters['redirect'] = parameters['redirect'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

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
    */
    getUsersConfirm(parameters: {
        'uid': string,
        'token': string,
        'redirect' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/confirm';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['uid'] !== undefined) {
                queryParameters['uid'] = parameters['uid'];
            }

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters['token'] !== undefined) {
                queryParameters['token'] = parameters['token'];
            }

            if (parameters['token'] === undefined) {
                reject(new Error('Missing required  parameter: token'));
                return;
            }

            if (parameters['redirect'] !== undefined) {
                queryParameters['redirect'] = parameters['redirect'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postUsersResetURL(parameters: {
        'options': {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/reset';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Reset password for a user with email.
    * @method
    * @name TweakApi#postUsersReset
         * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postUsersReset(parameters: {
        'options': {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Users/reset';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                body = parameters['options'];
            }

            if (parameters['options'] === undefined) {
                reject(new Error('Missing required  parameter: options'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getMessagesGreetURL(parameters: {
        'msg' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Messages/greet';
        if (parameters['msg'] !== undefined) {
            queryParameters['msg'] = parameters['msg'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * 
    * @method
    * @name TweakApi#getMessagesGreet
         * @param {string} msg - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getMessagesGreet(parameters: {
        'msg' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Messages/greet';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['msg'] !== undefined) {
                queryParameters['msg'] = parameters['msg'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for accessTokens.
     * @method
     * @name TweakApi#getCustomersByIdAccessTokensByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     */
    getCustomersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCustomersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for accessTokens.
     * @method
     * @name TweakApi#deleteCustomersByIdAccessTokensByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     */
    deleteCustomersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCustomersByIdAccessTokensByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for accessTokens.
    * @method
    * @name TweakApi#putCustomersByIdAccessTokensByFk
         * @param {string} id - Customer id
         * @param {string} fk - Foreign key for accessTokens
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putCustomersByIdAccessTokensByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdDesignsByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for designs.
     * @method
     * @name TweakApi#getCustomersByIdDesignsByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     */
    getCustomersByIdDesignsByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCustomersByIdDesignsByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for designs.
     * @method
     * @name TweakApi#deleteCustomersByIdDesignsByFk
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     */
    deleteCustomersByIdDesignsByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCustomersByIdDesignsByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for designs.
    * @method
    * @name TweakApi#putCustomersByIdDesignsByFk
         * @param {string} id - Customer id
         * @param {string} fk - Foreign key for designs
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putCustomersByIdDesignsByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdAccessTokensURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries accessTokens of Customer.
    * @method
    * @name TweakApi#getCustomersByIdAccessTokens
         * @param {string} id - Customer id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCustomersByIdAccessTokens(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersByIdAccessTokensURL(parameters: {
        'id': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in accessTokens of this model.
    * @method
    * @name TweakApi#postCustomersByIdAccessTokens
         * @param {string} id - Customer id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCustomersByIdAccessTokens(parameters: {
        'id': string,
        'data' ? : AccessToken,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCustomersByIdAccessTokensURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all accessTokens of this model.
     * @method
     * @name TweakApi#deleteCustomersByIdAccessTokens
     * @param {string} id - Customer id
     */
    deleteCustomersByIdAccessTokens(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdAccessTokensCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts accessTokens of Customer.
     * @method
     * @name TweakApi#getCustomersByIdAccessTokensCount
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     */
    getCustomersByIdAccessTokensCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/accessTokens/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdDesignsURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries designs of Customer.
    * @method
    * @name TweakApi#getCustomersByIdDesigns
         * @param {string} id - Customer id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCustomersByIdDesigns(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersByIdDesignsURL(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in designs of this model.
    * @method
    * @name TweakApi#postCustomersByIdDesigns
         * @param {string} id - Customer id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCustomersByIdDesigns(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCustomersByIdDesignsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all designs of this model.
     * @method
     * @name TweakApi#deleteCustomersByIdDesigns
     * @param {string} id - Customer id
     */
    deleteCustomersByIdDesigns(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdDesignsCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts designs of Customer.
     * @method
     * @name TweakApi#getCustomersByIdDesignsCount
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     */
    getCustomersByIdDesignsCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/designs/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersURL(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name TweakApi#postCustomers
     * @param {} data - Model instance data
     */
    postCustomers(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCustomersURL(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#putCustomers
     * @param {} data - Model instance data
     */
    putCustomers(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchCustomersURL(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#patchCustomers
     * @param {} data - Model instance data
     */
    patchCustomers(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getCustomers
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getCustomers(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersReplaceOrCreateURL(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/replaceOrCreate';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#postCustomersReplaceOrCreate
     * @param {} data - Model instance data
     */
    postCustomersReplaceOrCreate(parameters: {
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/replaceOrCreate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersUpsertWithWhereURL(parameters: {
        'where' ? : string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/upsertWithWhere';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name TweakApi#postCustomersUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postCustomersUpsertWithWhere(parameters: {
        'where' ? : string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/upsertWithWhere';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdExistsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/exists';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#getCustomersByIdExists
     * @param {string} id - Model id
     */
    getCustomersByIdExists(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/exists';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    headCustomersByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#headCustomersById
     * @param {string} id - Model id
     */
    headCustomersById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('HEAD', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersByIdURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#getCustomersById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    getCustomersById(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCustomersByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#deleteCustomersById
     * @param {string} id - Model id
     */
    deleteCustomersById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCustomersByIdURL(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#putCustomersById
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     */
    putCustomersById(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchCustomersByIdURL(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#patchCustomersById
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     */
    patchCustomersById(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersByIdReplaceURL(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/replace';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#postCustomersByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    postCustomersByIdReplace(parameters: {
        'id': string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/{id}/replace';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersFindOneURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/findOne';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getCustomersFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getCustomersFindOne(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/findOne';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersUpdateURL(parameters: {
        'where' ? : string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/update';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name TweakApi#postCustomersUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postCustomersUpdate(parameters: {
        'where' ? : string,
        'data' ? : Customer,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/update';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersCountURL(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/count';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name TweakApi#getCustomersCount
     * @param {string} where - Criteria to match model instances
     */
    getCustomersCount(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/change-stream';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#postCustomersChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCustomersChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                form['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/change-stream';
        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#getCustomersChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCustomersChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                queryParameters['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersLoginURL(parameters: {
        'credentials': {},
        'include' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/login';

        if (parameters['include'] !== undefined) {
            queryParameters['include'] = parameters['include'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Login a user with username/email and password.
    * @method
    * @name TweakApi#postCustomersLogin
         * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} include - Related objects to include in the response. See the description of return value for more details.
    */
    postCustomersLogin(parameters: {
        'credentials': {},
        'include' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/login';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['credentials'] !== undefined) {
                body = parameters['credentials'];
            }

            if (parameters['credentials'] === undefined) {
                reject(new Error('Missing required  parameter: credentials'));
                return;
            }

            if (parameters['include'] !== undefined) {
                queryParameters['include'] = parameters['include'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersLogoutURL(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/logout';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Logout a user with access token.
     * @method
     * @name TweakApi#postCustomersLogout
     */
    postCustomersLogout(parameters: {
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/logout';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCustomersConfirmURL(parameters: {
        'uid': string,
        'token': string,
        'redirect' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/confirm';
        if (parameters['uid'] !== undefined) {
            queryParameters['uid'] = parameters['uid'];
        }

        if (parameters['token'] !== undefined) {
            queryParameters['token'] = parameters['token'];
        }

        if (parameters['redirect'] !== undefined) {
            queryParameters['redirect'] = parameters['redirect'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

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
    */
    getCustomersConfirm(parameters: {
        'uid': string,
        'token': string,
        'redirect' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/confirm';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['uid'] !== undefined) {
                queryParameters['uid'] = parameters['uid'];
            }

            if (parameters['uid'] === undefined) {
                reject(new Error('Missing required  parameter: uid'));
                return;
            }

            if (parameters['token'] !== undefined) {
                queryParameters['token'] = parameters['token'];
            }

            if (parameters['token'] === undefined) {
                reject(new Error('Missing required  parameter: token'));
                return;
            }

            if (parameters['redirect'] !== undefined) {
                queryParameters['redirect'] = parameters['redirect'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCustomersResetURL(parameters: {
        'options': {},
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/reset';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Reset password for a user with email.
    * @method
    * @name TweakApi#postCustomersReset
         * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCustomersReset(parameters: {
        'options': {},
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Customers/reset';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                body = parameters['options'];
            }

            if (parameters['options'] === undefined) {
                reject(new Error('Missing required  parameter: options'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdCustomerURL(parameters: {
        'id': string,
        'refresh' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/customer';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Fetches belongsTo relation customer.
    * @method
    * @name TweakApi#getDesignsByIdCustomer
         * @param {string} id - Design id
         * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getDesignsByIdCustomer(parameters: {
        'id': string,
        'refresh' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/customer';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['refresh'] !== undefined) {
                queryParameters['refresh'] = parameters['refresh'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdTagsByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for tags.
     * @method
     * @name TweakApi#getDesignsByIdTagsByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     */
    getDesignsByIdTagsByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteDesignsByIdTagsByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for tags.
     * @method
     * @name TweakApi#deleteDesignsByIdTagsByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     */
    deleteDesignsByIdTagsByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putDesignsByIdTagsByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for tags.
    * @method
    * @name TweakApi#putDesignsByIdTagsByFk
         * @param {string} id - Design id
         * @param {string} fk - Foreign key for tags
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putDesignsByIdTagsByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdCategoriesByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for categories.
     * @method
     * @name TweakApi#getDesignsByIdCategoriesByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     */
    getDesignsByIdCategoriesByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteDesignsByIdCategoriesByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for categories.
     * @method
     * @name TweakApi#deleteDesignsByIdCategoriesByFk
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     */
    deleteDesignsByIdCategoriesByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putDesignsByIdCategoriesByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for categories.
    * @method
    * @name TweakApi#putDesignsByIdCategoriesByFk
         * @param {string} id - Design id
         * @param {string} fk - Foreign key for categories
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putDesignsByIdCategoriesByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdTagsURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries tags of Design.
    * @method
    * @name TweakApi#getDesignsByIdTags
         * @param {string} id - Design id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getDesignsByIdTags(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsByIdTagsURL(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in tags of this model.
    * @method
    * @name TweakApi#postDesignsByIdTags
         * @param {string} id - Design id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postDesignsByIdTags(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteDesignsByIdTagsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all tags of this model.
     * @method
     * @name TweakApi#deleteDesignsByIdTags
     * @param {string} id - Design id
     */
    deleteDesignsByIdTags(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdTagsCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts tags of Design.
     * @method
     * @name TweakApi#getDesignsByIdTagsCount
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     */
    getDesignsByIdTagsCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/tags/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdCategoriesURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries categories of Design.
    * @method
    * @name TweakApi#getDesignsByIdCategories
         * @param {string} id - Design id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getDesignsByIdCategories(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsByIdCategoriesURL(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in categories of this model.
    * @method
    * @name TweakApi#postDesignsByIdCategories
         * @param {string} id - Design id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postDesignsByIdCategories(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteDesignsByIdCategoriesURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all categories of this model.
     * @method
     * @name TweakApi#deleteDesignsByIdCategories
     * @param {string} id - Design id
     */
    deleteDesignsByIdCategories(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdCategoriesCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts categories of Design.
     * @method
     * @name TweakApi#getDesignsByIdCategoriesCount
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     */
    getDesignsByIdCategoriesCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/categories/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsURL(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name TweakApi#postDesigns
     * @param {} data - Model instance data
     */
    postDesigns(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putDesignsURL(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#putDesigns
     * @param {} data - Model instance data
     */
    putDesigns(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchDesignsURL(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#patchDesigns
     * @param {} data - Model instance data
     */
    patchDesigns(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getDesigns
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getDesigns(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsReplaceOrCreateURL(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/replaceOrCreate';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#postDesignsReplaceOrCreate
     * @param {} data - Model instance data
     */
    postDesignsReplaceOrCreate(parameters: {
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/replaceOrCreate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsUpsertWithWhereURL(parameters: {
        'where' ? : string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/upsertWithWhere';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name TweakApi#postDesignsUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postDesignsUpsertWithWhere(parameters: {
        'where' ? : string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/upsertWithWhere';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdExistsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/exists';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#getDesignsByIdExists
     * @param {string} id - Model id
     */
    getDesignsByIdExists(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/exists';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    headDesignsByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#headDesignsById
     * @param {string} id - Model id
     */
    headDesignsById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('HEAD', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsByIdURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#getDesignsById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    getDesignsById(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteDesignsByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#deleteDesignsById
     * @param {string} id - Model id
     */
    deleteDesignsById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putDesignsByIdURL(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#putDesignsById
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     */
    putDesignsById(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchDesignsByIdURL(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#patchDesignsById
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     */
    patchDesignsById(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsByIdReplaceURL(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/replace';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#postDesignsByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    postDesignsByIdReplace(parameters: {
        'id': string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/{id}/replace';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsFindOneURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/findOne';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getDesignsFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getDesignsFindOne(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/findOne';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsUpdateURL(parameters: {
        'where' ? : string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/update';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name TweakApi#postDesignsUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postDesignsUpdate(parameters: {
        'where' ? : string,
        'data' ? : Design,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/update';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsCountURL(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/count';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name TweakApi#getDesignsCount
     * @param {string} where - Criteria to match model instances
     */
    getDesignsCount(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postDesignsChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/change-stream';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#postDesignsChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postDesignsChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                form['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getDesignsChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/change-stream';
        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#getDesignsChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getDesignsChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Designs/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                queryParameters['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsURL(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name TweakApi#postTags
     * @param {} data - Model instance data
     */
    postTags(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putTagsURL(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#putTags
     * @param {} data - Model instance data
     */
    putTags(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchTagsURL(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#patchTags
     * @param {} data - Model instance data
     */
    patchTags(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getTags
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getTags(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsReplaceOrCreateURL(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/replaceOrCreate';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#postTagsReplaceOrCreate
     * @param {} data - Model instance data
     */
    postTagsReplaceOrCreate(parameters: {
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/replaceOrCreate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsUpsertWithWhereURL(parameters: {
        'where' ? : string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/upsertWithWhere';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name TweakApi#postTagsUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postTagsUpsertWithWhere(parameters: {
        'where' ? : string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/upsertWithWhere';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsByIdExistsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}/exists';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#getTagsByIdExists
     * @param {string} id - Model id
     */
    getTagsByIdExists(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}/exists';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    headTagsByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#headTagsById
     * @param {string} id - Model id
     */
    headTagsById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('HEAD', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsByIdURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#getTagsById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    getTagsById(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteTagsByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#deleteTagsById
     * @param {string} id - Model id
     */
    deleteTagsById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putTagsByIdURL(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#putTagsById
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     */
    putTagsById(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchTagsByIdURL(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#patchTagsById
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     */
    patchTagsById(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsByIdReplaceURL(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}/replace';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#postTagsByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    postTagsByIdReplace(parameters: {
        'id': string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/{id}/replace';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsFindOneURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/findOne';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getTagsFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getTagsFindOne(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/findOne';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsUpdateURL(parameters: {
        'where' ? : string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/update';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name TweakApi#postTagsUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postTagsUpdate(parameters: {
        'where' ? : string,
        'data' ? : Tag,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/update';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsCountURL(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/count';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name TweakApi#getTagsCount
     * @param {string} where - Criteria to match model instances
     */
    getTagsCount(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postTagsChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/change-stream';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#postTagsChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postTagsChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                form['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTagsChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/change-stream';
        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#getTagsChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getTagsChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Tags/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                queryParameters['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdChildrenByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a related item by id for children.
     * @method
     * @name TweakApi#getCategoriesByIdChildrenByFk
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     */
    getCategoriesByIdChildrenByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCategoriesByIdChildrenByFkURL(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a related item by id for children.
     * @method
     * @name TweakApi#deleteCategoriesByIdChildrenByFk
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     */
    deleteCategoriesByIdChildrenByFk(parameters: {
        'id': string,
        'fk': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCategoriesByIdChildrenByFkURL(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';

        path = path.replace('{id}', `${parameters['id']}`);

        path = path.replace('{fk}', `${parameters['fk']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Update a related item by id for children.
    * @method
    * @name TweakApi#putCategoriesByIdChildrenByFk
         * @param {string} id - Category id
         * @param {string} fk - Foreign key for children
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    putCategoriesByIdChildrenByFk(parameters: {
        'id': string,
        'fk': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/{fk}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            path = path.replace('{fk}', `${parameters['fk']}`);

            if (parameters['fk'] === undefined) {
                reject(new Error('Missing required  parameter: fk'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdParentURL(parameters: {
        'id': string,
        'refresh' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/parent';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['refresh'] !== undefined) {
            queryParameters['refresh'] = parameters['refresh'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Fetches belongsTo relation parent.
    * @method
    * @name TweakApi#getCategoriesByIdParent
         * @param {string} id - Category id
         * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCategoriesByIdParent(parameters: {
        'id': string,
        'refresh' ? : boolean,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/parent';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['refresh'] !== undefined) {
                queryParameters['refresh'] = parameters['refresh'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdChildrenURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Queries children of Category.
    * @method
    * @name TweakApi#getCategoriesByIdChildren
         * @param {string} id - Category id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCategoriesByIdChildren(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesByIdChildrenURL(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Creates a new instance in children of this model.
    * @method
    * @name TweakApi#postCategoriesByIdChildren
         * @param {string} id - Category id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCategoriesByIdChildren(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCategoriesByIdChildrenURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Deletes all children of this model.
     * @method
     * @name TweakApi#deleteCategoriesByIdChildren
     * @param {string} id - Category id
     */
    deleteCategoriesByIdChildren(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdChildrenCountURL(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/count';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Counts children of Category.
     * @method
     * @name TweakApi#getCategoriesByIdChildrenCount
     * @param {string} id - Category id
     * @param {string} where - Criteria to match model instances
     */
    getCategoriesByIdChildrenCount(parameters: {
        'id': string,
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/children/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesURL(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     * @method
     * @name TweakApi#postCategories
     * @param {} data - Model instance data
     */
    postCategories(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCategoriesURL(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#putCategories
     * @param {} data - Model instance data
     */
    putCategories(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchCategoriesURL(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#patchCategories
     * @param {} data - Model instance data
     */
    patchCategories(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getCategories
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getCategories(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesReplaceOrCreateURL(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/replaceOrCreate';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     * @method
     * @name TweakApi#postCategoriesReplaceOrCreate
     * @param {} data - Model instance data
     */
    postCategoriesReplaceOrCreate(parameters: {
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/replaceOrCreate';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesUpsertWithWhereURL(parameters: {
        'where' ? : string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/upsertWithWhere';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     * @method
     * @name TweakApi#postCategoriesUpsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postCategoriesUpsertWithWhere(parameters: {
        'where' ? : string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/upsertWithWhere';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdExistsURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/exists';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#getCategoriesByIdExists
     * @param {string} id - Model id
     */
    getCategoriesByIdExists(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/exists';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    headCategoriesByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Check whether a model instance exists in the data source.
     * @method
     * @name TweakApi#headCategoriesById
     * @param {string} id - Model id
     */
    headCategoriesById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('HEAD', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesByIdURL(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';

        path = path.replace('{id}', `${parameters['id']}`);
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#getCategoriesById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    getCategoriesById(parameters: {
        'id': string,
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteCategoriesByIdURL(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     * @method
     * @name TweakApi#deleteCategoriesById
     * @param {string} id - Model id
     */
    deleteCategoriesById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    putCategoriesByIdURL(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#putCategoriesById
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     */
    putCategoriesById(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    patchCategoriesByIdURL(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#patchCategoriesById
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     */
    patchCategoriesById(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PATCH', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesByIdReplaceURL(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/replace';

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     * @method
     * @name TweakApi#postCategoriesByIdReplace
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    postCategoriesByIdReplace(parameters: {
        'id': string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/{id}/replace';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesFindOneURL(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/findOne';
        if (parameters['filter'] !== undefined) {
            queryParameters['filter'] = parameters['filter'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     * @method
     * @name TweakApi#getCategoriesFindOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    getCategoriesFindOne(parameters: {
        'filter' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/findOne';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['filter'] !== undefined) {
                queryParameters['filter'] = parameters['filter'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesUpdateURL(parameters: {
        'where' ? : string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/update';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     * @method
     * @name TweakApi#postCategoriesUpdate
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    postCategoriesUpdate(parameters: {
        'where' ? : string,
        'data' ? : Category,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/update';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters['data'] !== undefined) {
                body = parameters['data'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesCountURL(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/count';
        if (parameters['where'] !== undefined) {
            queryParameters['where'] = parameters['where'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Count instances of the model matched by where from the data source.
     * @method
     * @name TweakApi#getCategoriesCount
     * @param {string} where - Criteria to match model instances
     */
    getCategoriesCount(parameters: {
        'where' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/count';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['where'] !== undefined) {
                queryParameters['where'] = parameters['where'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCategoriesChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/change-stream';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#postCategoriesChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    postCategoriesChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                form['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCategoriesChangeStreamURL(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/change-stream';
        if (parameters['options'] !== undefined) {
            queryParameters['options'] = parameters['options'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
    * Create a change stream.
    * @method
    * @name TweakApi#getCategoriesChangeStream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    getCategoriesChangeStream(parameters: {
        'options' ? : string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/Categories/change-stream';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/json,application/x-www-form-urlencoded,application/xml,text/xml';

            if (parameters['options'] !== undefined) {
                queryParameters['options'] = parameters['options'];
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}