(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakMigration', TweakMigration);

    TweakMigration.$inject = ['$log'];

    function TweakMigration($log) {

        /**
         * Constructor, with class name
         * @param name    {string}    [REQUIRED]    
         * @param runDtTm {string}    [REQUIRED]    format: date-time  
         * @param id      {object}                  $ref: #/definitions/ObjectID  
         */
        function TweakMigration(data) {
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
        var parameters = ['name', 'runDtTm', 'id'];
        var parametersType = ['string', 'string', 'object'];
        var requiredParameters = ['name', 'runDtTm'];

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
        TweakMigration.build = function (data) {
            return new TweakMigration(data);
        };

        TweakMigration.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakMigration.build).filter(Boolean);
            }
            return TweakMigration.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakMigration;
    }
})();