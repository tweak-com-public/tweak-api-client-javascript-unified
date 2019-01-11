(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingBankAccount', TweakBillingBankAccount);

    TweakBillingBankAccount.$inject = ['$log'];

    function TweakBillingBankAccount($log) {

        /**
         * Constructor, with class name
         * @param id                 {string}    
         * @param object             {string}    default: bank_account  
         * @param account            {string}    
         * @param accountHolderName  {string}    
         * @param accountHolderType  {string}    
         * @param bankName           {string}    
         * @param country            {string}    
         * @param currency           {string}    
         * @param defaultForCurrency {boolean}   default: false  
         * @param fingerprint        {string}    
         * @param last4              {string}    
         * @param routingNumber      {string}    
         * @param status             {string}    
         * @param token              {string}    
         * @param address            {object}    $ref: #/definitions/BillingAddress  
         */
        function TweakBillingBankAccount(data) {
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
        var parameters = ['id', 'object', 'account', 'accountHolderName', 'accountHolderType', 'bankName', 'country', 'currency', 'defaultForCurrency', 'fingerprint', 'last4', 'routingNumber', 'status', 'token', 'address'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'boolean', 'string', 'string', 'string', 'string', 'string', 'object'];
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
        TweakBillingBankAccount.build = function (data) {
            return new TweakBillingBankAccount(data);
        };

        TweakBillingBankAccount.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingBankAccount.build).filter(Boolean);
            }
            return TweakBillingBankAccount.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingBankAccount;
    }
})();