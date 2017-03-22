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

    private domain: string = "";
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

    User_prototype___findById__accessTokensURL(parameters: {
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
     * @name TweakApi#User_prototype___findById__accessTokens
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     */
    User_prototype___findById__accessTokens(parameters: {
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

    User_prototype___destroyById__accessTokensURL(parameters: {
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
     * @name TweakApi#User_prototype___destroyById__accessTokens
     * @param {string} id - User id
     * @param {string} fk - Foreign key for accessTokens
     */
    User_prototype___destroyById__accessTokens(parameters: {
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

    User_prototype___updateById__accessTokensURL(parameters: {
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
    * @name TweakApi#User_prototype___updateById__accessTokens
         * @param {string} id - User id
         * @param {string} fk - Foreign key for accessTokens
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_prototype___updateById__accessTokens(parameters: {
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

    User_prototype___get__accessTokensURL(parameters: {
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
    * @name TweakApi#User_prototype___get__accessTokens
         * @param {string} id - User id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_prototype___get__accessTokens(parameters: {
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

    User_prototype___create__accessTokensURL(parameters: {
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
    * @name TweakApi#User_prototype___create__accessTokens
         * @param {string} id - User id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_prototype___create__accessTokens(parameters: {
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

    User_prototype___delete__accessTokensURL(parameters: {
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
     * @name TweakApi#User_prototype___delete__accessTokens
     * @param {string} id - User id
     */
    User_prototype___delete__accessTokens(parameters: {
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

    User_prototype___count__accessTokensURL(parameters: {
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
     * @name TweakApi#User_prototype___count__accessTokens
     * @param {string} id - User id
     * @param {string} where - Criteria to match model instances
     */
    User_prototype___count__accessTokens(parameters: {
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

    User_createURL(parameters: {
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
     * @name TweakApi#User_create
     * @param {} data - Model instance data
     */
    User_create(parameters: {
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

    User_upsert__put_UsersURL(parameters: {
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
     * @name TweakApi#User_upsert__put_Users
     * @param {} data - Model instance data
     */
    User_upsert__put_Users(parameters: {
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

    User_upsert__patch_UsersURL(parameters: {
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
     * @name TweakApi#User_upsert__patch_Users
     * @param {} data - Model instance data
     */
    User_upsert__patch_Users(parameters: {
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

    User_findURL(parameters: {
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
     * @name TweakApi#User_find
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    User_find(parameters: {
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

    User_replaceOrCreateURL(parameters: {
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
     * @name TweakApi#User_replaceOrCreate
     * @param {} data - Model instance data
     */
    User_replaceOrCreate(parameters: {
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

    User_upsertWithWhereURL(parameters: {
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
     * @name TweakApi#User_upsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    User_upsertWithWhere(parameters: {
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

    User_exists__get_Users__id__existsURL(parameters: {
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
     * @name TweakApi#User_exists__get_Users__id__exists
     * @param {string} id - Model id
     */
    User_exists__get_Users__id__exists(parameters: {
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

    User_exists__head_Users__id_URL(parameters: {
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
     * @name TweakApi#User_exists__head_Users__id_
     * @param {string} id - Model id
     */
    User_exists__head_Users__id_(parameters: {
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

    User_findByIdURL(parameters: {
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
     * @name TweakApi#User_findById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    User_findById(parameters: {
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

    User_deleteByIdURL(parameters: {
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
     * @name TweakApi#User_deleteById
     * @param {string} id - Model id
     */
    User_deleteById(parameters: {
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

    User_prototype_updateAttributes__put_Users__id_URL(parameters: {
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
     * @name TweakApi#User_prototype_updateAttributes__put_Users__id_
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     */
    User_prototype_updateAttributes__put_Users__id_(parameters: {
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

    User_prototype_updateAttributes__patch_Users__id_URL(parameters: {
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
     * @name TweakApi#User_prototype_updateAttributes__patch_Users__id_
     * @param {string} id - User id
     * @param {} data - An object of model property name/value pairs
     */
    User_prototype_updateAttributes__patch_Users__id_(parameters: {
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

    User_replaceByIdURL(parameters: {
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
     * @name TweakApi#User_replaceById
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    User_replaceById(parameters: {
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

    User_findOneURL(parameters: {
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
     * @name TweakApi#User_findOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    User_findOne(parameters: {
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

    User_updateAllURL(parameters: {
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
     * @name TweakApi#User_updateAll
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    User_updateAll(parameters: {
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

    User_countURL(parameters: {
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
     * @name TweakApi#User_count
     * @param {string} where - Criteria to match model instances
     */
    User_count(parameters: {
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

    User_createChangeStream__post_Users_change_streamURL(parameters: {
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
    * @name TweakApi#User_createChangeStream__post_Users_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_createChangeStream__post_Users_change_stream(parameters: {
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

    User_createChangeStream__get_Users_change_streamURL(parameters: {
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
    * @name TweakApi#User_createChangeStream__get_Users_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_createChangeStream__get_Users_change_stream(parameters: {
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

    User_loginURL(parameters: {
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
    * @name TweakApi#User_login
         * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} include - Related objects to include in the response. See the description of return value for more details.
    */
    User_login(parameters: {
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

    User_logoutURL(parameters: {
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
     * @name TweakApi#User_logout
     */
    User_logout(parameters: {
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

    User_confirmURL(parameters: {
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
    * @name TweakApi#User_confirm
         * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_confirm(parameters: {
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

    User_resetPasswordURL(parameters: {
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
    * @name TweakApi#User_resetPassword
         * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    User_resetPassword(parameters: {
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

    Message_greetURL(parameters: {
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
    * @name TweakApi#Message_greet
         * @param {string} msg - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Message_greet(parameters: {
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

    Customer_prototype___findById__accessTokensURL(parameters: {
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
     * @name TweakApi#Customer_prototype___findById__accessTokens
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     */
    Customer_prototype___findById__accessTokens(parameters: {
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

    Customer_prototype___destroyById__accessTokensURL(parameters: {
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
     * @name TweakApi#Customer_prototype___destroyById__accessTokens
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for accessTokens
     */
    Customer_prototype___destroyById__accessTokens(parameters: {
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

    Customer_prototype___updateById__accessTokensURL(parameters: {
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
    * @name TweakApi#Customer_prototype___updateById__accessTokens
         * @param {string} id - Customer id
         * @param {string} fk - Foreign key for accessTokens
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___updateById__accessTokens(parameters: {
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

    Customer_prototype___findById__designsURL(parameters: {
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
     * @name TweakApi#Customer_prototype___findById__designs
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     */
    Customer_prototype___findById__designs(parameters: {
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

    Customer_prototype___destroyById__designsURL(parameters: {
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
     * @name TweakApi#Customer_prototype___destroyById__designs
     * @param {string} id - Customer id
     * @param {string} fk - Foreign key for designs
     */
    Customer_prototype___destroyById__designs(parameters: {
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

    Customer_prototype___updateById__designsURL(parameters: {
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
    * @name TweakApi#Customer_prototype___updateById__designs
         * @param {string} id - Customer id
         * @param {string} fk - Foreign key for designs
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___updateById__designs(parameters: {
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

    Customer_prototype___get__accessTokensURL(parameters: {
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
    * @name TweakApi#Customer_prototype___get__accessTokens
         * @param {string} id - Customer id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___get__accessTokens(parameters: {
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

    Customer_prototype___create__accessTokensURL(parameters: {
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
    * @name TweakApi#Customer_prototype___create__accessTokens
         * @param {string} id - Customer id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___create__accessTokens(parameters: {
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

    Customer_prototype___delete__accessTokensURL(parameters: {
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
     * @name TweakApi#Customer_prototype___delete__accessTokens
     * @param {string} id - Customer id
     */
    Customer_prototype___delete__accessTokens(parameters: {
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

    Customer_prototype___count__accessTokensURL(parameters: {
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
     * @name TweakApi#Customer_prototype___count__accessTokens
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     */
    Customer_prototype___count__accessTokens(parameters: {
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

    Customer_prototype___get__designsURL(parameters: {
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
    * @name TweakApi#Customer_prototype___get__designs
         * @param {string} id - Customer id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___get__designs(parameters: {
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

    Customer_prototype___create__designsURL(parameters: {
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
    * @name TweakApi#Customer_prototype___create__designs
         * @param {string} id - Customer id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_prototype___create__designs(parameters: {
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

    Customer_prototype___delete__designsURL(parameters: {
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
     * @name TweakApi#Customer_prototype___delete__designs
     * @param {string} id - Customer id
     */
    Customer_prototype___delete__designs(parameters: {
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

    Customer_prototype___count__designsURL(parameters: {
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
     * @name TweakApi#Customer_prototype___count__designs
     * @param {string} id - Customer id
     * @param {string} where - Criteria to match model instances
     */
    Customer_prototype___count__designs(parameters: {
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

    Customer_createURL(parameters: {
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
     * @name TweakApi#Customer_create
     * @param {} data - Model instance data
     */
    Customer_create(parameters: {
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

    Customer_upsert__put_CustomersURL(parameters: {
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
     * @name TweakApi#Customer_upsert__put_Customers
     * @param {} data - Model instance data
     */
    Customer_upsert__put_Customers(parameters: {
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

    Customer_upsert__patch_CustomersURL(parameters: {
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
     * @name TweakApi#Customer_upsert__patch_Customers
     * @param {} data - Model instance data
     */
    Customer_upsert__patch_Customers(parameters: {
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

    Customer_findURL(parameters: {
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
     * @name TweakApi#Customer_find
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Customer_find(parameters: {
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

    Customer_replaceOrCreateURL(parameters: {
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
     * @name TweakApi#Customer_replaceOrCreate
     * @param {} data - Model instance data
     */
    Customer_replaceOrCreate(parameters: {
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

    Customer_upsertWithWhereURL(parameters: {
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
     * @name TweakApi#Customer_upsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Customer_upsertWithWhere(parameters: {
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

    Customer_exists__get_Customers__id__existsURL(parameters: {
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
     * @name TweakApi#Customer_exists__get_Customers__id__exists
     * @param {string} id - Model id
     */
    Customer_exists__get_Customers__id__exists(parameters: {
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

    Customer_exists__head_Customers__id_URL(parameters: {
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
     * @name TweakApi#Customer_exists__head_Customers__id_
     * @param {string} id - Model id
     */
    Customer_exists__head_Customers__id_(parameters: {
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

    Customer_findByIdURL(parameters: {
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
     * @name TweakApi#Customer_findById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    Customer_findById(parameters: {
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

    Customer_deleteByIdURL(parameters: {
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
     * @name TweakApi#Customer_deleteById
     * @param {string} id - Model id
     */
    Customer_deleteById(parameters: {
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

    Customer_prototype_updateAttributes__put_Customers__id_URL(parameters: {
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
     * @name TweakApi#Customer_prototype_updateAttributes__put_Customers__id_
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     */
    Customer_prototype_updateAttributes__put_Customers__id_(parameters: {
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

    Customer_prototype_updateAttributes__patch_Customers__id_URL(parameters: {
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
     * @name TweakApi#Customer_prototype_updateAttributes__patch_Customers__id_
     * @param {string} id - Customer id
     * @param {} data - An object of model property name/value pairs
     */
    Customer_prototype_updateAttributes__patch_Customers__id_(parameters: {
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

    Customer_replaceByIdURL(parameters: {
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
     * @name TweakApi#Customer_replaceById
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    Customer_replaceById(parameters: {
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

    Customer_findOneURL(parameters: {
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
     * @name TweakApi#Customer_findOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Customer_findOne(parameters: {
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

    Customer_updateAllURL(parameters: {
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
     * @name TweakApi#Customer_updateAll
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Customer_updateAll(parameters: {
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

    Customer_countURL(parameters: {
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
     * @name TweakApi#Customer_count
     * @param {string} where - Criteria to match model instances
     */
    Customer_count(parameters: {
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

    Customer_createChangeStream__post_Customers_change_streamURL(parameters: {
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
    * @name TweakApi#Customer_createChangeStream__post_Customers_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_createChangeStream__post_Customers_change_stream(parameters: {
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

    Customer_createChangeStream__get_Customers_change_streamURL(parameters: {
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
    * @name TweakApi#Customer_createChangeStream__get_Customers_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_createChangeStream__get_Customers_change_stream(parameters: {
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

    Customer_loginURL(parameters: {
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
    * @name TweakApi#Customer_login
         * @param {} credentials - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} include - Related objects to include in the response. See the description of return value for more details.
    */
    Customer_login(parameters: {
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

    Customer_logoutURL(parameters: {
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
     * @name TweakApi#Customer_logout
     */
    Customer_logout(parameters: {
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

    Customer_confirmURL(parameters: {
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
    * @name TweakApi#Customer_confirm
         * @param {string} uid - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} token - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
         * @param {string} redirect - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_confirm(parameters: {
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

    Customer_resetPasswordURL(parameters: {
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
    * @name TweakApi#Customer_resetPassword
         * @param {} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Customer_resetPassword(parameters: {
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

    Design_prototype___get__customerURL(parameters: {
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
    * @name TweakApi#Design_prototype___get__customer
         * @param {string} id - Design id
         * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___get__customer(parameters: {
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

    Design_prototype___findById__tagsURL(parameters: {
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
     * @name TweakApi#Design_prototype___findById__tags
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     */
    Design_prototype___findById__tags(parameters: {
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

    Design_prototype___destroyById__tagsURL(parameters: {
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
     * @name TweakApi#Design_prototype___destroyById__tags
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for tags
     */
    Design_prototype___destroyById__tags(parameters: {
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

    Design_prototype___updateById__tagsURL(parameters: {
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
    * @name TweakApi#Design_prototype___updateById__tags
         * @param {string} id - Design id
         * @param {string} fk - Foreign key for tags
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___updateById__tags(parameters: {
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

    Design_prototype___findById__categoriesURL(parameters: {
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
     * @name TweakApi#Design_prototype___findById__categories
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     */
    Design_prototype___findById__categories(parameters: {
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

    Design_prototype___destroyById__categoriesURL(parameters: {
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
     * @name TweakApi#Design_prototype___destroyById__categories
     * @param {string} id - Design id
     * @param {string} fk - Foreign key for categories
     */
    Design_prototype___destroyById__categories(parameters: {
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

    Design_prototype___updateById__categoriesURL(parameters: {
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
    * @name TweakApi#Design_prototype___updateById__categories
         * @param {string} id - Design id
         * @param {string} fk - Foreign key for categories
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___updateById__categories(parameters: {
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

    Design_prototype___get__tagsURL(parameters: {
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
    * @name TweakApi#Design_prototype___get__tags
         * @param {string} id - Design id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___get__tags(parameters: {
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

    Design_prototype___create__tagsURL(parameters: {
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
    * @name TweakApi#Design_prototype___create__tags
         * @param {string} id - Design id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___create__tags(parameters: {
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

    Design_prototype___delete__tagsURL(parameters: {
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
     * @name TweakApi#Design_prototype___delete__tags
     * @param {string} id - Design id
     */
    Design_prototype___delete__tags(parameters: {
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

    Design_prototype___count__tagsURL(parameters: {
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
     * @name TweakApi#Design_prototype___count__tags
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     */
    Design_prototype___count__tags(parameters: {
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

    Design_prototype___get__categoriesURL(parameters: {
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
    * @name TweakApi#Design_prototype___get__categories
         * @param {string} id - Design id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___get__categories(parameters: {
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

    Design_prototype___create__categoriesURL(parameters: {
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
    * @name TweakApi#Design_prototype___create__categories
         * @param {string} id - Design id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_prototype___create__categories(parameters: {
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

    Design_prototype___delete__categoriesURL(parameters: {
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
     * @name TweakApi#Design_prototype___delete__categories
     * @param {string} id - Design id
     */
    Design_prototype___delete__categories(parameters: {
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

    Design_prototype___count__categoriesURL(parameters: {
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
     * @name TweakApi#Design_prototype___count__categories
     * @param {string} id - Design id
     * @param {string} where - Criteria to match model instances
     */
    Design_prototype___count__categories(parameters: {
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

    Design_createURL(parameters: {
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
     * @name TweakApi#Design_create
     * @param {} data - Model instance data
     */
    Design_create(parameters: {
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

    Design_upsert__put_DesignsURL(parameters: {
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
     * @name TweakApi#Design_upsert__put_Designs
     * @param {} data - Model instance data
     */
    Design_upsert__put_Designs(parameters: {
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

    Design_upsert__patch_DesignsURL(parameters: {
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
     * @name TweakApi#Design_upsert__patch_Designs
     * @param {} data - Model instance data
     */
    Design_upsert__patch_Designs(parameters: {
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

    Design_findURL(parameters: {
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
     * @name TweakApi#Design_find
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Design_find(parameters: {
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

    Design_replaceOrCreateURL(parameters: {
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
     * @name TweakApi#Design_replaceOrCreate
     * @param {} data - Model instance data
     */
    Design_replaceOrCreate(parameters: {
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

    Design_upsertWithWhereURL(parameters: {
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
     * @name TweakApi#Design_upsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Design_upsertWithWhere(parameters: {
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

    Design_exists__get_Designs__id__existsURL(parameters: {
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
     * @name TweakApi#Design_exists__get_Designs__id__exists
     * @param {string} id - Model id
     */
    Design_exists__get_Designs__id__exists(parameters: {
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

    Design_exists__head_Designs__id_URL(parameters: {
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
     * @name TweakApi#Design_exists__head_Designs__id_
     * @param {string} id - Model id
     */
    Design_exists__head_Designs__id_(parameters: {
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

    Design_findByIdURL(parameters: {
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
     * @name TweakApi#Design_findById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    Design_findById(parameters: {
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

    Design_deleteByIdURL(parameters: {
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
     * @name TweakApi#Design_deleteById
     * @param {string} id - Model id
     */
    Design_deleteById(parameters: {
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

    Design_prototype_updateAttributes__put_Designs__id_URL(parameters: {
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
     * @name TweakApi#Design_prototype_updateAttributes__put_Designs__id_
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     */
    Design_prototype_updateAttributes__put_Designs__id_(parameters: {
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

    Design_prototype_updateAttributes__patch_Designs__id_URL(parameters: {
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
     * @name TweakApi#Design_prototype_updateAttributes__patch_Designs__id_
     * @param {string} id - Design id
     * @param {} data - An object of model property name/value pairs
     */
    Design_prototype_updateAttributes__patch_Designs__id_(parameters: {
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

    Design_replaceByIdURL(parameters: {
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
     * @name TweakApi#Design_replaceById
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    Design_replaceById(parameters: {
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

    Design_findOneURL(parameters: {
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
     * @name TweakApi#Design_findOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Design_findOne(parameters: {
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

    Design_updateAllURL(parameters: {
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
     * @name TweakApi#Design_updateAll
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Design_updateAll(parameters: {
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

    Design_countURL(parameters: {
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
     * @name TweakApi#Design_count
     * @param {string} where - Criteria to match model instances
     */
    Design_count(parameters: {
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

    Design_createChangeStream__post_Designs_change_streamURL(parameters: {
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
    * @name TweakApi#Design_createChangeStream__post_Designs_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_createChangeStream__post_Designs_change_stream(parameters: {
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

    Design_createChangeStream__get_Designs_change_streamURL(parameters: {
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
    * @name TweakApi#Design_createChangeStream__get_Designs_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Design_createChangeStream__get_Designs_change_stream(parameters: {
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

    Tag_createURL(parameters: {
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
     * @name TweakApi#Tag_create
     * @param {} data - Model instance data
     */
    Tag_create(parameters: {
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

    Tag_upsert__put_TagsURL(parameters: {
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
     * @name TweakApi#Tag_upsert__put_Tags
     * @param {} data - Model instance data
     */
    Tag_upsert__put_Tags(parameters: {
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

    Tag_upsert__patch_TagsURL(parameters: {
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
     * @name TweakApi#Tag_upsert__patch_Tags
     * @param {} data - Model instance data
     */
    Tag_upsert__patch_Tags(parameters: {
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

    Tag_findURL(parameters: {
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
     * @name TweakApi#Tag_find
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Tag_find(parameters: {
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

    Tag_replaceOrCreateURL(parameters: {
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
     * @name TweakApi#Tag_replaceOrCreate
     * @param {} data - Model instance data
     */
    Tag_replaceOrCreate(parameters: {
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

    Tag_upsertWithWhereURL(parameters: {
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
     * @name TweakApi#Tag_upsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Tag_upsertWithWhere(parameters: {
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

    Tag_exists__get_Tags__id__existsURL(parameters: {
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
     * @name TweakApi#Tag_exists__get_Tags__id__exists
     * @param {string} id - Model id
     */
    Tag_exists__get_Tags__id__exists(parameters: {
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

    Tag_exists__head_Tags__id_URL(parameters: {
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
     * @name TweakApi#Tag_exists__head_Tags__id_
     * @param {string} id - Model id
     */
    Tag_exists__head_Tags__id_(parameters: {
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

    Tag_findByIdURL(parameters: {
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
     * @name TweakApi#Tag_findById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    Tag_findById(parameters: {
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

    Tag_deleteByIdURL(parameters: {
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
     * @name TweakApi#Tag_deleteById
     * @param {string} id - Model id
     */
    Tag_deleteById(parameters: {
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

    Tag_prototype_updateAttributes__put_Tags__id_URL(parameters: {
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
     * @name TweakApi#Tag_prototype_updateAttributes__put_Tags__id_
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     */
    Tag_prototype_updateAttributes__put_Tags__id_(parameters: {
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

    Tag_prototype_updateAttributes__patch_Tags__id_URL(parameters: {
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
     * @name TweakApi#Tag_prototype_updateAttributes__patch_Tags__id_
     * @param {string} id - Tag id
     * @param {} data - An object of model property name/value pairs
     */
    Tag_prototype_updateAttributes__patch_Tags__id_(parameters: {
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

    Tag_replaceByIdURL(parameters: {
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
     * @name TweakApi#Tag_replaceById
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    Tag_replaceById(parameters: {
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

    Tag_findOneURL(parameters: {
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
     * @name TweakApi#Tag_findOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Tag_findOne(parameters: {
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

    Tag_updateAllURL(parameters: {
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
     * @name TweakApi#Tag_updateAll
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Tag_updateAll(parameters: {
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

    Tag_countURL(parameters: {
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
     * @name TweakApi#Tag_count
     * @param {string} where - Criteria to match model instances
     */
    Tag_count(parameters: {
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

    Tag_createChangeStream__post_Tags_change_streamURL(parameters: {
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
    * @name TweakApi#Tag_createChangeStream__post_Tags_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Tag_createChangeStream__post_Tags_change_stream(parameters: {
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

    Tag_createChangeStream__get_Tags_change_streamURL(parameters: {
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
    * @name TweakApi#Tag_createChangeStream__get_Tags_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Tag_createChangeStream__get_Tags_change_stream(parameters: {
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

    Category_prototype___findById__childrenURL(parameters: {
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
     * @name TweakApi#Category_prototype___findById__children
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     */
    Category_prototype___findById__children(parameters: {
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

    Category_prototype___destroyById__childrenURL(parameters: {
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
     * @name TweakApi#Category_prototype___destroyById__children
     * @param {string} id - Category id
     * @param {string} fk - Foreign key for children
     */
    Category_prototype___destroyById__children(parameters: {
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

    Category_prototype___updateById__childrenURL(parameters: {
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
    * @name TweakApi#Category_prototype___updateById__children
         * @param {string} id - Category id
         * @param {string} fk - Foreign key for children
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_prototype___updateById__children(parameters: {
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

    Category_prototype___get__parentURL(parameters: {
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
    * @name TweakApi#Category_prototype___get__parent
         * @param {string} id - Category id
         * @param {boolean} refresh - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_prototype___get__parent(parameters: {
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

    Category_prototype___get__childrenURL(parameters: {
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
    * @name TweakApi#Category_prototype___get__children
         * @param {string} id - Category id
         * @param {string} filter - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_prototype___get__children(parameters: {
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

    Category_prototype___create__childrenURL(parameters: {
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
    * @name TweakApi#Category_prototype___create__children
         * @param {string} id - Category id
         * @param {} data - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_prototype___create__children(parameters: {
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

    Category_prototype___delete__childrenURL(parameters: {
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
     * @name TweakApi#Category_prototype___delete__children
     * @param {string} id - Category id
     */
    Category_prototype___delete__children(parameters: {
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

    Category_prototype___count__childrenURL(parameters: {
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
     * @name TweakApi#Category_prototype___count__children
     * @param {string} id - Category id
     * @param {string} where - Criteria to match model instances
     */
    Category_prototype___count__children(parameters: {
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

    Category_createURL(parameters: {
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
     * @name TweakApi#Category_create
     * @param {} data - Model instance data
     */
    Category_create(parameters: {
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

    Category_upsert__put_CategoriesURL(parameters: {
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
     * @name TweakApi#Category_upsert__put_Categories
     * @param {} data - Model instance data
     */
    Category_upsert__put_Categories(parameters: {
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

    Category_upsert__patch_CategoriesURL(parameters: {
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
     * @name TweakApi#Category_upsert__patch_Categories
     * @param {} data - Model instance data
     */
    Category_upsert__patch_Categories(parameters: {
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

    Category_findURL(parameters: {
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
     * @name TweakApi#Category_find
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Category_find(parameters: {
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

    Category_replaceOrCreateURL(parameters: {
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
     * @name TweakApi#Category_replaceOrCreate
     * @param {} data - Model instance data
     */
    Category_replaceOrCreate(parameters: {
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

    Category_upsertWithWhereURL(parameters: {
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
     * @name TweakApi#Category_upsertWithWhere
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Category_upsertWithWhere(parameters: {
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

    Category_exists__get_Categories__id__existsURL(parameters: {
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
     * @name TweakApi#Category_exists__get_Categories__id__exists
     * @param {string} id - Model id
     */
    Category_exists__get_Categories__id__exists(parameters: {
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

    Category_exists__head_Categories__id_URL(parameters: {
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
     * @name TweakApi#Category_exists__head_Categories__id_
     * @param {string} id - Model id
     */
    Category_exists__head_Categories__id_(parameters: {
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

    Category_findByIdURL(parameters: {
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
     * @name TweakApi#Category_findById
     * @param {string} id - Model id
     * @param {string} filter - Filter defining fields and include
     */
    Category_findById(parameters: {
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

    Category_deleteByIdURL(parameters: {
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
     * @name TweakApi#Category_deleteById
     * @param {string} id - Model id
     */
    Category_deleteById(parameters: {
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

    Category_prototype_updateAttributes__put_Categories__id_URL(parameters: {
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
     * @name TweakApi#Category_prototype_updateAttributes__put_Categories__id_
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     */
    Category_prototype_updateAttributes__put_Categories__id_(parameters: {
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

    Category_prototype_updateAttributes__patch_Categories__id_URL(parameters: {
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
     * @name TweakApi#Category_prototype_updateAttributes__patch_Categories__id_
     * @param {string} id - Category id
     * @param {} data - An object of model property name/value pairs
     */
    Category_prototype_updateAttributes__patch_Categories__id_(parameters: {
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

    Category_replaceByIdURL(parameters: {
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
     * @name TweakApi#Category_replaceById
     * @param {string} id - Model id
     * @param {} data - Model instance data
     */
    Category_replaceById(parameters: {
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

    Category_findOneURL(parameters: {
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
     * @name TweakApi#Category_findOne
     * @param {string} filter - Filter defining fields, where, include, order, offset, and limit
     */
    Category_findOne(parameters: {
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

    Category_updateAllURL(parameters: {
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
     * @name TweakApi#Category_updateAll
     * @param {string} where - Criteria to match model instances
     * @param {} data - An object of model property name/value pairs
     */
    Category_updateAll(parameters: {
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

    Category_countURL(parameters: {
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
     * @name TweakApi#Category_count
     * @param {string} where - Criteria to match model instances
     */
    Category_count(parameters: {
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

    Category_createChangeStream__post_Categories_change_streamURL(parameters: {
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
    * @name TweakApi#Category_createChangeStream__post_Categories_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_createChangeStream__post_Categories_change_stream(parameters: {
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

    Category_createChangeStream__get_Categories_change_streamURL(parameters: {
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
    * @name TweakApi#Category_createChangeStream__get_Categories_change_stream
         * @param {string} options - Tweak API to integrate with all the Tweak services.  You can find out more about Tweak 
        at <a href='https://www.tweak.com'>https://www.tweak.com</a>, #tweak.
    */
    Category_createChangeStream__get_Categories_change_stream(parameters: {
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