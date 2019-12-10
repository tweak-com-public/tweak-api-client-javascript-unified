(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakIndustryV2', TweakIndustryV2);

    TweakIndustryV2.$inject = ['$log'];

    function TweakIndustryV2($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param legacyId {string}                  
         * @param id       {number}                  format: double  
         */
        function TweakIndustryV2(data) {
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
        var parameters = ['name', 'legacyId', 'id'];
        var parametersType = ['string', 'string', 'number'];
        var requiredParameters = ['name'];

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
        TweakIndustryV2.build = function (data) {
            return new TweakIndustryV2(data);
        };

        TweakIndustryV2.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakIndustryV2.build).filter(Boolean);
            }
            return TweakIndustryV2.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakIndustryV2;
    }
})();