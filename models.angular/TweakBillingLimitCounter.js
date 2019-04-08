(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimitCounter', TweakBillingLimitCounter);

    TweakBillingLimitCounter.$inject = ['$log'];

    function TweakBillingLimitCounter($log) {

        /**
         * Constructor, with class name
         * @param limit      {number}    default: 0  format: double  
         * @param count      {number}    default: 0  format: double  
         * @param unitType   {string}    enum: none, binary
         * @param unitPrefix {string}    
         * @param id         {number}    format: double  
         */
        function TweakBillingLimitCounter(data) {
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
        var parameters = ['limit', 'count', 'unitType', 'unitPrefix', 'id'];
        var parametersType = ['number', 'number', 'string', 'string', 'number'];
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
        TweakBillingLimitCounter.build = function (data) {
            return new TweakBillingLimitCounter(data);
        };

        TweakBillingLimitCounter.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimitCounter.build).filter(Boolean);
            }
            return TweakBillingLimitCounter.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimitCounter;
    }
})();