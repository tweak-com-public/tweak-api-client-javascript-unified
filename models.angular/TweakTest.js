(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTest', TweakTest);

    TweakTest.$inject = ['$log'];

    function TweakTest($log) {

        /**
         * Constructor, with class name
         * @param prop1 {string}    [REQUIRED]    
         * @param prop2 {string}                  
         * @param prop3 {string}                  default: a-default-value  
         * @param id    {string}                  
         */
        function TweakTest(data) {
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
        var parameters = ['prop1', 'prop2', 'prop3', 'id'];
        var parametersType = ['string', 'string', 'string', 'string'];
        var requiredParameters = ['prop1'];

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
        TweakTest.build = function (data) {
            return new TweakTest(data);
        };

        TweakTest.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTest.build).filter(Boolean);
            }
            return TweakTest.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTest;
    }
})();