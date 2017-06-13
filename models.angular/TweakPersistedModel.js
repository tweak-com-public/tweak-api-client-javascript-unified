(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPersistedModel', TweakPersistedModel);

    TweakPersistedModel.$inject = ['$log'];

    function TweakPersistedModel($log) {

        /**
         * Constructor, with class name
         * @param id {number}    format: double  
         */
        function TweakPersistedModel(data) {
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
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error('Wrong parameter type for `' + parameters[i] + '`: should be `' + parametersType[i] + '`!');
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakPersistedModel.build = function (data) {
            return new TweakPersistedModel(data);
        };

        TweakPersistedModel.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPersistedModel.build).filter(Boolean);
            }
            return TweakPersistedModel.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPersistedModel;
    }
})();