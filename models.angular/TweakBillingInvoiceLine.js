(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingInvoiceLine', TweakBillingInvoiceLine);

    TweakBillingInvoiceLine.$inject = ['$log'];

    function TweakBillingInvoiceLine($log) {

        /**
         * Constructor, with class name
         * @param id               {string}    [REQUIRED]    
         * @param amount           {number}                  format: double  
         * @param currency         {string}                  
         * @param customer         {string}                  
         * @param date             {string}                  format: date-time  
         * @param description      {string}                  
         * @param discountable     {boolean}                 
         * @param invoice          {string}                  
         * @param period           {object}                  
         * @param plan             {object}                  $ref: #/definitions/BillingPlan  
         * @param proration        {boolean}                 
         * @param quantity         {number}                  format: double  
         * @param subscription     {string}                  
         * @param subscriptionItem {string}                  
         */
        function TweakBillingInvoiceLine(data) {
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
        var parameters = ['id', 'amount', 'currency', 'customer', 'date', 'description', 'discountable', 'invoice', 'period', 'plan', 'proration', 'quantity', 'subscription', 'subscriptionItem'];
        var parametersType = ['string', 'number', 'string', 'string', 'string', 'string', 'boolean', 'string', 'object', 'object', 'boolean', 'number', 'string', 'string'];
        var requiredParameters = ['id'];

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
        TweakBillingInvoiceLine.build = function (data) {
            return new TweakBillingInvoiceLine(data);
        };

        TweakBillingInvoiceLine.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingInvoiceLine.build).filter(Boolean);
            }
            return TweakBillingInvoiceLine.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingInvoiceLine;
    }
})();