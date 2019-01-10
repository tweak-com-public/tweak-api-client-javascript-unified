(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDimensions', TweakDimensions);

    TweakDimensions.$inject = ['$log'];

    function TweakDimensions($log) {

        /**
         * Constructor, with class name
         * @param width  {number}    [REQUIRED]    minimum: 0  format: double  
         * @param height {number}    [REQUIRED]    minimum: 0  format: double  
         * @param depth  {number}                  minimum: 0  format: double  
         * @param id     {string}                  
         */
        function TweakDimensions(data) {
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
        var parameters = ['width', 'height', 'depth', 'id'];
        var parametersType = ['number', 'number', 'number', 'string'];
        var requiredParameters = ['width', 'height'];

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
        TweakDimensions.build = function (data) {
            return new TweakDimensions(data);
        };

        TweakDimensions.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDimensions.build).filter(Boolean);
            }
            return TweakDimensions.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDimensions;
    }
})();