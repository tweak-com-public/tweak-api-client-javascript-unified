(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBoundsNegative', TweakBoundsNegative);

    TweakBoundsNegative.$inject = ['$log'];

    function TweakBoundsNegative($log) {

        /**
         * Constructor, with class name
         * @param top    {number}    maximum: 0  default: 0  format: double  
         * @param bottom {number}    maximum: 0  default: 0  format: double  
         * @param left   {number}    maximum: 0  default: 0  format: double  
         * @param right  {number}    maximum: 0  default: 0  format: double  
         * @param id     {string}    
         */
        function TweakBoundsNegative(data) {
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
        var parameters = ['top', 'bottom', 'left', 'right', 'id'];
        var parametersType = ['number', 'number', 'number', 'number', 'string'];
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
        TweakBoundsNegative.build = function (data) {
            return new TweakBoundsNegative(data);
        };

        TweakBoundsNegative.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBoundsNegative.build).filter(Boolean);
            }
            return TweakBoundsNegative.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBoundsNegative;
    }
})();