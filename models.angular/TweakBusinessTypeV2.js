(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBusinessTypeV2', TweakBusinessTypeV2);

    TweakBusinessTypeV2.$inject = ['$log'];

    function TweakBusinessTypeV2($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param metadata {array}                   default: items: type: string    
         * @param legacyId {string}                  
         * @param id       {number}                  format: double  
         */
        function TweakBusinessTypeV2(data) {
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
        var parametersType = ['string', 'array', 'string', 'number'];
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
        TweakBusinessTypeV2.build = function (data) {
            return new TweakBusinessTypeV2(data);
        };

        TweakBusinessTypeV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBusinessTypeV2.build).filter(Boolean);
            }
            return TweakBusinessTypeV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBusinessTypeV2;
    }
})();