(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakMigrationMap', TweakMigrationMap);

    TweakMigrationMap.$inject = ['$log'];

    function TweakMigrationMap($log) {

        /**
         * Constructor, with class name
         * @param type {string}    [REQUIRED]    
         * @param from {string}    [REQUIRED]    
         * @param to   {string}    [REQUIRED]    
         * @param data {object}                  
         * @param id   {number}                  format: double  
         */
        function TweakMigrationMap(data) {
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
        var parameters = ['type', 'from', 'to', 'data', 'id'];
        var parametersType = ['string', 'string', 'string', 'object', 'number'];
        var requiredParameters = ['type', 'from', 'to'];

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
        TweakMigrationMap.build = function (data) {
            return new TweakMigrationMap(data);
        };

        TweakMigrationMap.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakMigrationMap.build).filter(Boolean);
            }
            return TweakMigrationMap.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakMigrationMap;
    }
})();