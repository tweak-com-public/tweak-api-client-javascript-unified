(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPublicV2AccessLog', TweakPublicV2AccessLog);

    TweakPublicV2AccessLog.$inject = ['$log'];

    function TweakPublicV2AccessLog($log) {

        /**
         * Constructor, with class name
         * @param url           {string}    [REQUIRED]    
         * @param clientIp      {string}                  default: unknown  
         * @param clientCountry {string}                  default: unknown  
         * @param ttl           {number}                  default: -1  format: double  
         * @param subdomain     {string}    [REQUIRED]    
         * @param apiVersion    {string}    [REQUIRED]    
         * @param sessionId     {string}                  default: no-session  
         * @param id            {string}    [REQUIRED]    
         * @param scopes        {array}                   description: Array of scopes granted to this access token.  items: type: string    
         * @param created       {string}                  format: date-time  
         * @param userId        {object}                  $ref: #/definitions/ObjectID  
         * @param teamId        {string}                  
         * @param teamMemberId  {object}                  $ref: #/definitions/ObjectID  
         * @param portalId      {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakPublicV2AccessLog(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }


            for (var i = 0; i < parameters.length; i++) {

                if (this[parameters[i]] && parametersType[i] === 'string' ) {

                    this[parameters[i]] = '' + this[parameters[i]];

                }

            }


            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['url', 'clientIp', 'clientCountry', 'ttl', 'subdomain', 'apiVersion', 'sessionId', 'id', 'scopes', 'created', 'userId', 'teamId', 'teamMemberId', 'portalId'];
        var parametersType = ['string', 'string', 'string', 'number', 'string', 'string', 'string', 'string', 'array', 'string', 'object', 'string', 'object', 'object'];
        var requiredParameters = ['url', 'subdomain', 'apiVersion', 'id'];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error('Required parameter `' + requiredParameter + '` is missing!');
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                if (parametersType[i].match(/^any$/i)) {
                    continue;
                }
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakPublicV2AccessLog.build = function (data) {
            return new TweakPublicV2AccessLog(data);
        };

        TweakPublicV2AccessLog.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPublicV2AccessLog.build).filter(Boolean);
            }
            return TweakPublicV2AccessLog.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPublicV2AccessLog;
    }
})();