(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBilling', TweakBilling);

    TweakBilling.$inject = ['$log'];

    function TweakBilling($log) {

        /**
         * Constructor, with class name
         * @param companyName          {string}    
         * @param companyEmail         {string}    
         * @param companyVat           {string}    
         * @param companyCard          {object}    $ref: #/definitions/BillingCard  
         * @param companyBankAccount   {object}    $ref: #/definitions/BillingBankAccount  
         * @param companySource        {object}    $ref: #/definitions/BillingSource  
         * @param subscription         {object}    $ref: #/definitions/BillingSubscription  
         * @param limit                {object}    $ref: #/definitions/BillingLimit  
         * @param taxPercent           {number}    default: 0  format: double  
         * @param stripeCustomerId     {string}    
         * @param stripeCardId         {string}    
         * @param stripeBankAccountId  {string}    
         * @param stripeSourceId       {string}    
         * @param stripeSubscriptionId {string}    
         * @param id                   {string}    
         * @param teamId               {string}    
         * @param team                 {object}    $ref: #/definitions/Team  
         */
        function TweakBilling(data) {
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
        var parameters = ['companyName', 'companyEmail', 'companyVat', 'companyCard', 'companyBankAccount', 'companySource', 'subscription', 'limit', 'taxPercent', 'stripeCustomerId', 'stripeCardId', 'stripeBankAccountId', 'stripeSourceId', 'stripeSubscriptionId', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'string', 'string', 'object', 'object', 'object', 'object', 'object', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object'];
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
        TweakBilling.build = function (data) {
            return new TweakBilling(data);
        };

        TweakBilling.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBilling.build).filter(Boolean);
            }
            return TweakBilling.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBilling;
    }
})();