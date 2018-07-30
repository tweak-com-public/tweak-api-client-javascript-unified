(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceSepaDebit', TweakBillingSourceSepaDebit);

    TweakBillingSourceSepaDebit.$inject = ['$log'];

    function TweakBillingSourceSepaDebit($log) {

        /**
         * Constructor, with class name
         * @param bankCode         {string}    
         * @param country          {string}    
         * @param fingerprint      {string}    
         * @param last4            {string}    
         * @param mandateReference {string}    
         * @param mandateUrl       {string}    
         * @param id               {string}    
         */
        function TweakBillingSourceSepaDebit(data) {
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
        var parameters = ['bankCode', 'country', 'fingerprint', 'last4', 'mandateReference', 'mandateUrl', 'id'];
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
        TweakBillingSourceSepaDebit.build = function (data) {
            return new TweakBillingSourceSepaDebit(data);
        };

        TweakBillingSourceSepaDebit.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceSepaDebit.build).filter(Boolean);
            }
            return TweakBillingSourceSepaDebit.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceSepaDebit;
    }
})();