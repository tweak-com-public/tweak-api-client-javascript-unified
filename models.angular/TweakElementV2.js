(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakElementV2', TweakElementV2);

    TweakElementV2.$inject = ['$log'];

    function TweakElementV2($log) {

        /**
         * Constructor, with class name
         * @param legacyId {string}    
         * @param type     {string}    enum: frame, highlights, line, shape
         * @param id       {number}    format: double  
         */
        function TweakElementV2(data) {
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
        var parameters = ['legacyId', 'type', 'id'];
        var parametersType = ['string', 'string', 'number'];
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
        TweakElementV2.build = function (data) {
            return new TweakElementV2(data);
        };

        TweakElementV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakElementV2.build).filter(Boolean);
            }
            return TweakElementV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakElementV2;
    }
})();