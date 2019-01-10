(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamCustomerPermissionSet', TweakTeamCustomerPermissionSet);

    TweakTeamCustomerPermissionSet.$inject = ['$log'];

    function TweakTeamCustomerPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param anonimizeEmail        {boolean}   default: false  
         * @param anonimizedEmailDomain {string}    default: tweak.com  
         * @param id                    {string}    
         */
        function TweakTeamCustomerPermissionSet(data) {
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
        var parameters = ['anonimizeEmail', 'anonimizedEmailDomain', 'id'];
        var parametersType = ['boolean', 'string', 'string'];
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
        TweakTeamCustomerPermissionSet.build = function (data) {
            return new TweakTeamCustomerPermissionSet(data);
        };

        TweakTeamCustomerPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamCustomerPermissionSet.build).filter(Boolean);
            }
            return TweakTeamCustomerPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamCustomerPermissionSet;
    }
})();