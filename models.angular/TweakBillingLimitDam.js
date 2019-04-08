(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimitDam', TweakBillingLimitDam);

    TweakBillingLimitDam.$inject = ['$log'];

    function TweakBillingLimitDam($log) {

        /**
         * Constructor, with class name
         * @param enabled {boolean}   default: false  
         * @param id      {number}    format: double  
         */
        function TweakBillingLimitDam(data) {
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
        TweakBillingLimitDam.build = function (data) {
            return new TweakBillingLimitDam(data);
        };

        TweakBillingLimitDam.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimitDam.build).filter(Boolean);
            }
            return TweakBillingLimitDam.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimitDam;
    }
})();