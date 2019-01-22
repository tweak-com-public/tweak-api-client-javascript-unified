(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingLimitBuilder', TweakBillingLimitBuilder);

    TweakBillingLimitBuilder.$inject = ['$log'];

    function TweakBillingLimitBuilder($log) {

        /**
         * Constructor, with class name
         * @param enabled {boolean}   default: true  
         * @param configs {object}    default:   $ref: #/definitions/BillingLimitBuilderConfig  
         * @param id      {string}    
         */
        function TweakBillingLimitBuilder(data) {
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
        var parameters = ['enabled', 'configs', 'id'];
        var parametersType = ['boolean', 'object', 'string'];
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
        TweakBillingLimitBuilder.build = function (data) {
            return new TweakBillingLimitBuilder(data);
        };

        TweakBillingLimitBuilder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingLimitBuilder.build).filter(Boolean);
            }
            return TweakBillingLimitBuilder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingLimitBuilder;
    }
})();