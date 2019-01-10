(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingCharge', TweakBillingCharge);

    TweakBillingCharge.$inject = ['$log'];

    function TweakBillingCharge($log) {

        /**
         * Constructor, with class name
         * @param id                  {string}    [REQUIRED]    
         * @param amount              {number}                  format: double  
         * @param amountRefunded      {number}                  format: double  
         * @param application         {string}                  
         * @param applicationFee      {string}                  
         * @param balanceTransaction  {string}                  
         * @param captured            {boolean}                 
         * @param created             {string}                  format: date-time  
         * @param currency            {number}                  format: double  
         * @param customer            {string}                  
         * @param description         {string}                  
         * @param destination         {string}                  
         * @param dispute             {string}                  
         * @param failureCode         {string}                  
         * @param failureMessage      {string}                  
         * @param fraudDetails        {object}                  
         * @param invoice             {string}                  
         * @param livemode            {boolean}                 
         * @param metadata            {object}                  
         * @param onBehalfOf          {string}                  
         * @param order               {string}                  
         * @param outcome             {object}                  
         * @param paid                {boolean}                 
         * @param receiptEmail        {string}                  
         * @param receiptNumber       {string}                  
         * @param refunded            {boolean}                 
         * @param refunds             {array}                   items: type: object    
         * @param review              {string}                  
         * @param shipping            {object}                  
         * @param source              {object}                  
         * @param sourceTransfer      {string}                  
         * @param statementDescriptor {string}                  
         * @param status              {string}                  
         * @param transfer            {string}                  
         * @param transferGroup       {string}                  
         */
        function TweakBillingCharge(data) {
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
        var parameters = ['id', 'amount', 'amountRefunded', 'application', 'applicationFee', 'balanceTransaction', 'captured', 'created', 'currency', 'customer', 'description', 'destination', 'dispute', 'failureCode', 'failureMessage', 'fraudDetails', 'invoice', 'livemode', 'metadata', 'onBehalfOf', 'order', 'outcome', 'paid', 'receiptEmail', 'receiptNumber', 'refunded', 'refunds', 'review', 'shipping', 'source', 'sourceTransfer', 'statementDescriptor', 'status', 'transfer', 'transferGroup'];
        var parametersType = ['string', 'number', 'number', 'string', 'string', 'string', 'boolean', 'string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'string', 'boolean', 'object', 'string', 'string', 'object', 'boolean', 'string', 'string', 'boolean', 'array', 'string', 'object', 'object', 'string', 'string', 'string', 'string', 'string'];
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
        TweakBillingCharge.build = function (data) {
            return new TweakBillingCharge(data);
        };

        TweakBillingCharge.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingCharge.build).filter(Boolean);
            }
            return TweakBillingCharge.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingCharge;
    }
})();