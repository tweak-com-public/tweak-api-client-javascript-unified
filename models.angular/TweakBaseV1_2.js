(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBaseV1_2', TweakBaseV1_2);

    TweakBaseV1_2.$inject = ['$log'];

    function TweakBaseV1_2($log) {

        /**
         * Constructor, with class name
         * @param id {number}    format: double  
         */
        function TweakBaseV1_2(data) {
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
        var parameters = ['id'];
        var parametersType = ['number'];
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
        TweakBaseV1_2.build = function (data) {
            return new TweakBaseV1_2(data);
        };

        TweakBaseV1_2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBaseV1_2.build).filter(Boolean);
            }
            return TweakBaseV1_2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBaseV1_2;
    }
})();