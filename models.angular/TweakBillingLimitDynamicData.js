(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimitDynamicData', TweakBillingLimitDynamicData);

    TweakBillingLimitDynamicData.$inject = ['$log'];

    function TweakBillingLimitDynamicData($log) {

        /**
         * Constructor, with class name
         * @param enabled {boolean}   default: true  
         * @param id      {number}    format: double  
         */
        function TweakBillingLimitDynamicData(data) {
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
        var parameters = ['enabled', 'id'];
        var parametersType = ['boolean', 'number'];
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
        TweakBillingLimitDynamicData.build = function (data) {
            return new TweakBillingLimitDynamicData(data);
        };

        TweakBillingLimitDynamicData.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimitDynamicData.build).filter(Boolean);
            }
            return TweakBillingLimitDynamicData.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimitDynamicData;
    }
})();