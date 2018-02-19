(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceAchCreditTransfer', TweakBillingSourceAchCreditTransfer);

    TweakBillingSourceAchCreditTransfer.$inject = ['$log'];

    function TweakBillingSourceAchCreditTransfer($log) {

        /**
         * Constructor, with class name
         * @param accountNumber {string}    
         * @param routingNumber {string}    
         * @param fingerprint   {string}    
         * @param bankName      {string}    
         * @param swiftCode     {string}    
         * @param id            {string}    
         */
        function TweakBillingSourceAchCreditTransfer(data) {
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
        var parameters = ['accountNumber', 'routingNumber', 'fingerprint', 'bankName', 'swiftCode', 'id'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string'];
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
        TweakBillingSourceAchCreditTransfer.build = function (data) {
            return new TweakBillingSourceAchCreditTransfer(data);
        };

        TweakBillingSourceAchCreditTransfer.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceAchCreditTransfer.build).filter(Boolean);
            }
            return TweakBillingSourceAchCreditTransfer.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceAchCreditTransfer;
    }
})();