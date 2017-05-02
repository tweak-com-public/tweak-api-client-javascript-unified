(function () {
    'use strict';
    angular.module('Tweak')
        .factory('Tweakx-any', Tweakx-any);

    Tweakx-any.$inject = ['$log'];

    function Tweakx-any($log) {

        /**
         * Constructor, with class name
         */
        function Tweakx-any() {
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = [];
        var parametersType = [];
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
        Tweakx-any.build = function (data) {
            return new Tweakx-any(
            );
        };

        Tweakx-any.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(Tweakx-any.build).filter(Boolean);
            }
            return Tweakx-any.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return Tweakx-any;
    }
})();