(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceSofort', TweakBillingSourceSofort);

    TweakBillingSourceSofort.$inject = ['$log'];

    function TweakBillingSourceSofort($log) {

        /**
         * Constructor, with class name
         * @param country             {string}    
         * @param bankCode            {string}    
         * @param bic                 {string}    
         * @param bankName            {string}    
         * @param ibanLast4           {string}    
         * @param preferredLanguage   {string}    
         * @param statementDescriptor {string}    
         * @param id                  {number}    format: double  
         */
        function TweakBillingSourceSofort(data) {
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
        var parameters = ['country', 'bankCode', 'bic', 'bankName', 'ibanLast4', 'preferredLanguage', 'statementDescriptor', 'id'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'number'];
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
        TweakBillingSourceSofort.build = function (data) {
            return new TweakBillingSourceSofort(data);
        };

        TweakBillingSourceSofort.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceSofort.build).filter(Boolean);
            }
            return TweakBillingSourceSofort.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceSofort;
    }
})();