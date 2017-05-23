(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBrand', TweakTeamBrand);

    TweakTeamBrand.$inject = ['$log'];

    function TweakTeamBrand($log) {

        /**
         * Constructor, with class name
         * @param name   {string}    
         * @param id     {string}    
         * @param teamId {string}    
         * @param team   {object}    $ref: #/definitions/Team  
         */
        function TweakTeamBrand(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'string', 'string', 'object'];
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
        TweakTeamBrand.build = function (data) {
            return new TweakTeamBrand(data);
        };

        TweakTeamBrand.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamBrand.build).filter(Boolean);
            }
            return TweakTeamBrand.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamBrand;
    }
})();