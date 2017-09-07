(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingInvoice', TweakBillingInvoice);

    TweakBillingInvoice.$inject = ['$log'];

    function TweakBillingInvoice($log) {

        /**
         * Constructor, with class name
         * @param id                        {string}    [REQUIRED]    
         * @param amountDue                 {number}                  format: double  
         * @param attemptCount              {number}                  format: double  
         * @param attempted                 {boolean}                 
         * @param charged                   {boolean}                 
         * @param closed                    {boolean}                 
         * @param currency                  {string}                  
         * @param customer                  {string}                  
         * @param date                      {string}                  format: date-time  
         * @param description               {string}                  
         * @param endingBalance             {number}                  format: double  
         * @param forgiven                  {boolean}                 
         * @param lines                     {array}                   items: $ref: #/definitions/BillingInvoiceLine    
         * @param nextPaymentAttempt        {string}                  format: date-time  
         * @param paid                      {boolean}                 
         * @param periodEnd                 {string}                  format: date-time  
         * @param periodStart               {string}                  format: date-time  
         * @param number                    {string}                  
         * @param reciptNumber              {string}                  
         * @param startingBalance           {number}                  format: double  
         * @param statementDescriptor       {string}                  
         * @param subscription              {string}                  
         * @param subscriptionProrationDate {number}                  format: double  
         * @param subtotal                  {number}                  format: double  
         * @param tax                       {number}                  format: double  
         * @param total                     {number}                  format: double  
         */
        function TweakBillingInvoice(data) {
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
        var parameters = ['id', 'amountDue', 'attemptCount', 'attempted', 'charged', 'closed', 'currency', 'customer', 'date', 'description', 'endingBalance', 'forgiven', 'lines', 'nextPaymentAttempt', 'paid', 'periodEnd', 'periodStart', 'number', 'reciptNumber', 'startingBalance', 'statementDescriptor', 'subscription', 'subscriptionProrationDate', 'subtotal', 'tax', 'total'];
        var parametersType = ['string', 'number', 'number', 'boolean', 'boolean', 'boolean', 'string', 'string', 'string', 'string', 'number', 'boolean', 'array', 'string', 'boolean', 'string', 'string', 'string', 'string', 'number', 'string', 'string', 'number', 'number', 'number', 'number'];
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
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakBillingInvoice.build = function (data) {
            return new TweakBillingInvoice(data);
        };

        TweakBillingInvoice.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingInvoice.build).filter(Boolean);
            }
            return TweakBillingInvoice.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingInvoice;
    }
})();