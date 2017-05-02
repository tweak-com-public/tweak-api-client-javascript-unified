(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamBrand', TweakTeamBrand);

    TweakTeamBrand.$inject = ['$log'];

    function TweakTeamBrand($log) {

        /**
         * Constructor, with class name
         * @param name   {string}    
         * @param id     {number}    format: double  
         * @param teamId {string}    
         * @param team   {string}    $ref: #/definitions/Team  
         */
        function TweakTeamBrand(name, id, teamId, team) {
            this.name = name;
            this.id = id;
            this.teamId = teamId;
            this.team = team;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'id', 'teamId', 'team'];
        var parametersType = ['string', 'number', 'string', 'string'];
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
            return new TweakTeamBrand(
                data.name,
                data.id,
                data.teamId,
                data.team
            );
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