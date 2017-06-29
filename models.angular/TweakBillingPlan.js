(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingPlan', TweakBillingPlan);

    TweakBillingPlan.$inject = ['$log'];

    function TweakBillingPlan($log) {

        /**
         * Constructor, with class name
         * @param id                   {string}    [REQUIRED]    
         * @param name                 {string}                  
         * @param amount               {number}                  format: double  
         * @param currency             {string}                  
         * @param interval             {string}                  
         * @param intervalCount        {number}                  format: double  
         * @param statementDescriptor  {string}                  
         * @param statementDescription {string}                  
         * @param trialPeriodDays      {number}                  format: double  
         * @param created              {string}                  format: date-time  
         */
        function TweakBillingPlan(data) {
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
        var parameters = ['id', 'name', 'amount', 'currency', 'interval', 'intervalCount', 'statementDescriptor', 'statementDescription', 'trialPeriodDays', 'created'];
        var parametersType = ['string', 'string', 'number', 'string', 'string', 'number', 'string', 'string', 'number', 'string'];
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
        TweakBillingPlan.build = function (data) {
            return new TweakBillingPlan(data);
        };

        TweakBillingPlan.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingPlan.build).filter(Boolean);
            }
            return TweakBillingPlan.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingPlan;
    }
})();