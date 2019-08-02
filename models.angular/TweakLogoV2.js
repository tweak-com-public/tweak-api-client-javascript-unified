(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakLogoV2', TweakLogoV2);

    TweakLogoV2.$inject = ['$log'];

    function TweakLogoV2($log) {

        /**
         * Constructor, with class name
         * @param legacyId {string}    
         * @param language {string}    enum: de, es, en, fr, it, nl, pt_BR
         * @param id       {number}    format: double  
         */
        function TweakLogoV2(data) {
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
        var parameters = ['legacyId', 'language', 'id'];
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
        TweakLogoV2.build = function (data) {
            return new TweakLogoV2(data);
        };

        TweakLogoV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakLogoV2.build).filter(Boolean);
            }
            return TweakLogoV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakLogoV2;
    }
})();