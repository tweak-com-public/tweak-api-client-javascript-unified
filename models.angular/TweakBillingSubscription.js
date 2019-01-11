(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSubscription', TweakBillingSubscription);

    TweakBillingSubscription.$inject = ['$log'];

    function TweakBillingSubscription($log) {

        /**
         * Constructor, with class name
         * @param id                 {string}                  
         * @param coupon             {string}                  
         * @param taxPercent         {number}                  format: double  
         * @param trialPeriodDays    {number}                  format: double  
         * @param subscribedPlans    {array}     [REQUIRED]    items: $ref: #/definitions/BillingSubscriptionItem    
         * @param discount           {number}                  format: double  
         * @param status             {string}                  
         * @param cancelAtPeriodEnd  {boolean}                 
         * @param created            {string}                  format: date-time  
         * @param start              {string}                  format: date-time  
         * @param endedAt            {string}                  format: date-time  
         * @param trialEnd           {string}                  format: date-time  
         * @param trialStart         {string}                  format: date-time  
         * @param currentPeriodEnd   {string}                  format: date-time  
         * @param currentPeriodStart {string}                  format: date-time  
         * @param canceledAt         {string}                  format: date-time  
         */
        function TweakBillingSubscription(data) {
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
        var parameters = ['id', 'coupon', 'taxPercent', 'trialPeriodDays', 'subscribedPlans', 'discount', 'status', 'cancelAtPeriodEnd', 'created', 'start', 'endedAt', 'trialEnd', 'trialStart', 'currentPeriodEnd', 'currentPeriodStart', 'canceledAt'];
        var parametersType = ['string', 'string', 'number', 'number', 'array', 'number', 'string', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string'];
        var requiredParameters = ['subscribedPlans'];

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
        TweakBillingSubscription.build = function (data) {
            return new TweakBillingSubscription(data);
        };

        TweakBillingSubscription.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSubscription.build).filter(Boolean);
            }
            return TweakBillingSubscription.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSubscription;
    }
})();