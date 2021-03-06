(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAxes', TweakAxes);

    TweakAxes.$inject = ['$log'];

    function TweakAxes($log) {

        /**
         * Constructor, with class name
         * @param x  {number}    [REQUIRED]    default: 0  format: double  
         * @param y  {number}    [REQUIRED]    default: 0  format: double  
         * @param id {string}                  
         */
        function TweakAxes(data) {
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
        var parameters = ['x', 'y', 'id'];
        var parametersType = ['number', 'number', 'string'];
        var requiredParameters = ['x', 'y'];

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
        TweakAxes.build = function (data) {
            return new TweakAxes(data);
        };

        TweakAxes.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAxes.build).filter(Boolean);
            }
            return TweakAxes.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAxes;
    }
})();