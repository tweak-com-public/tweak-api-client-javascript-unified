(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingCard', TweakBillingCard);

    TweakBillingCard.$inject = ['$log'];

    function TweakBillingCard($log) {

        /**
         * Constructor, with class name
         * @param cardholderName {string}    
         * @param expMonth       {number}    format: double  
         * @param expYear        {number}    format: double  
         * @param token          {string}    
         * @param number         {string}    
         * @param cvc            {string}    
         * @param last4          {string}    
         * @param brand          {string}    
         * @param country        {string}    
         * @param funding        {string}    
         * @param type           {string}    
         * @param addressCity    {string}    
         * @param addressCountry {string}    
         * @param addressLine1   {string}    
         * @param addressLine2   {string}    
         * @param addressState   {string}    
         * @param addressZip     {string}    
         * @param stripeCardId   {string}    
         * @param id             {string}    
         */
        function TweakBillingCard(data) {
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
        var parameters = ['cardholderName', 'expMonth', 'expYear', 'token', 'number', 'cvc', 'last4', 'brand', 'country', 'funding', 'type', 'addressCity', 'addressCountry', 'addressLine1', 'addressLine2', 'addressState', 'addressZip', 'stripeCardId', 'id'];
        var parametersType = ['string', 'number', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];
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
        TweakBillingCard.build = function (data) {
            return new TweakBillingCard(data);
        };

        TweakBillingCard.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingCard.build).filter(Boolean);
            }
            return TweakBillingCard.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingCard;
    }
})();