(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakCustomerPermissionSet', TweakCustomerPermissionSet);

    TweakCustomerPermissionSet.$inject = ['$log'];

    function TweakCustomerPermissionSet($log) {

        /**
         * Constructor, with class name
         * @param tweakEmail {boolean}   default: true  
         * @param id         {string}    
         * @param customerId {string}    
         * @param customer   {object}    $ref: #/definitions/Customer  
         */
        function TweakCustomerPermissionSet(data) {
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
        var parameters = ['tweakEmail', 'id', 'customerId', 'customer'];
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
        TweakCustomerPermissionSet.build = function (data) {
            return new TweakCustomerPermissionSet(data);
        };

        TweakCustomerPermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakCustomerPermissionSet.build).filter(Boolean);
            }
            return TweakCustomerPermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakCustomerPermissionSet;
    }
})();