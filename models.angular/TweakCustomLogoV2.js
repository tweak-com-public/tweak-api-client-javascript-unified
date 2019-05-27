(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakCustomLogoV2', TweakCustomLogoV2);

    TweakCustomLogoV2.$inject = ['$log'];

    function TweakCustomLogoV2($log) {

        /**
         * Constructor, with class name
         * @param id                   {object}    $ref: #/definitions/ObjectID  
         * @param originalCustomLogoId {object}    $ref: #/definitions/ObjectID  
         * @param teamId               {string}    
         * @param memberId             {object}    $ref: #/definitions/ObjectID  
         * @param portalId             {object}    $ref: #/definitions/ObjectID  
         * @param created              {string}    format: date-time  
         * @param modified             {string}    format: date-time  
         * @param migrated             {string}    format: date-time  
         * @param originalLogoId       {object}    $ref: #/definitions/ObjectID  
         */
        function TweakCustomLogoV2(data) {
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
        var parameters = ['id', 'originalCustomLogoId', 'teamId', 'memberId', 'portalId', 'created', 'modified', 'migrated', 'originalLogoId'];
        var parametersType = ['object', 'object', 'string', 'object', 'object', 'string', 'string', 'string', 'object'];
        var requiredParameters = [];

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
        TweakCustomLogoV2.build = function (data) {
            return new TweakCustomLogoV2(data);
        };

        TweakCustomLogoV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakCustomLogoV2.build).filter(Boolean);
            }
            return TweakCustomLogoV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakCustomLogoV2;
    }
})();