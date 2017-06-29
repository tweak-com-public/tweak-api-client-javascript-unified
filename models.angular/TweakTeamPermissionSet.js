(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamPermissionSet', TweakTeamPermissionSet);

    TweakTeamPermissionSet.$inject = ['$log'];

    function TweakTeamPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param emailNotification {boolean}   default: true  
         * @param id                {string}    
         * @param teamId            {string}    
         * @param team              {object}    $ref: #/definitions/Team  
         */
        function TweakTeamPermissionSet(data) {
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
        var parameters = ['emailNotification', 'id', 'teamId', 'team'];
        var parametersType = ['boolean', 'string', 'string', 'object'];
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
        TweakTeamPermissionSet.build = function (data) {
            return new TweakTeamPermissionSet(data);
        };

        TweakTeamPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamPermissionSet.build).filter(Boolean);
            }
            return TweakTeamPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamPermissionSet;
    }
})();