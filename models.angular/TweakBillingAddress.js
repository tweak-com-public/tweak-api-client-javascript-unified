(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingAddress', TweakBillingAddress);

    TweakBillingAddress.$inject = ['$log'];

    function TweakBillingAddress($log) {

        /**
         * Constructor, with class name
         * @param city       {string}    
         * @param country    {string}    
         * @param line1      {string}    
         * @param line2      {string}    
         * @param postalCode {string}    
         * @param state      {string}    
         * @param id         {string}    
         */
        function TweakBillingAddress(data) {
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
        var parameters = ['city', 'country', 'line1', 'line2', 'postalCode', 'state', 'id'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string'];
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
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakBillingAddress.build = function (data) {
            return new TweakBillingAddress(data);
        };

        TweakBillingAddress.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingAddress.build).filter(Boolean);
            }
            return TweakBillingAddress.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingAddress;
    }
})();