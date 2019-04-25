(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPublicV2BusinessType', TweakPublicV2BusinessType);

    TweakPublicV2BusinessType.$inject = ['$log'];

    function TweakPublicV2BusinessType($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param metadata {array}                   default: items: type: string    
         * @param legacyId {string}                  
         * @param id       {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakPublicV2BusinessType(data) {
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
        var parameters = ['name', 'metadata', 'legacyId', 'id'];
        var parametersType = ['string', 'array', 'string', 'object'];
        var requiredParameters = ['name'];

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
        TweakPublicV2BusinessType.build = function (data) {
            return new TweakPublicV2BusinessType(data);
        };

        TweakPublicV2BusinessType.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPublicV2BusinessType.build).filter(Boolean);
            }
            return TweakPublicV2BusinessType.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPublicV2BusinessType;
    }
})();