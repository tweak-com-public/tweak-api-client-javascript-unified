(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakGuest', TweakGuest);

    TweakGuest.$inject = ['$log'];

    function TweakGuest($log) {

        /**
         * Constructor, with class name
         * @param id   {string}    [REQUIRED]    
         * @param name {string}                  default:   
         */
        function TweakGuest(data) {
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
        var parameters = ['id', 'name'];
        var parametersType = ['string', 'string'];
        var requiredParameters = ['id'];

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
        TweakGuest.build = function (data) {
            return new TweakGuest(data);
        };

        TweakGuest.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakGuest.build).filter(Boolean);
            }
            return TweakGuest.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakGuest;
    }
})();