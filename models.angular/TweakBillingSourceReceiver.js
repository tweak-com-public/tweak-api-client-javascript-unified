(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceReceiver', TweakBillingSourceReceiver);

    TweakBillingSourceReceiver.$inject = ['$log'];

    function TweakBillingSourceReceiver($log) {

        /**
         * Constructor, with class name
         * @param address                {string}    
         * @param amountCharged          {number}    format: double  
         * @param amountReceived         {number}    format: double  
         * @param amountReturned         {number}    format: double  
         * @param refundAttributesMethod {string}    
         * @param refundAttributesStatus {string}    
         * @param id                     {number}    format: double  
         */
        function TweakBillingSourceReceiver(data) {
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
        var parameters = ['address', 'amountCharged', 'amountReceived', 'amountReturned', 'refundAttributesMethod', 'refundAttributesStatus', 'id'];
        var parametersType = ['string', 'number', 'number', 'number', 'string', 'string', 'number'];
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
        TweakBillingSourceReceiver.build = function (data) {
            return new TweakBillingSourceReceiver(data);
        };

        TweakBillingSourceReceiver.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceReceiver.build).filter(Boolean);
            }
            return TweakBillingSourceReceiver.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceReceiver;
    }
})();