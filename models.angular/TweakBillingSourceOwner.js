(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceOwner', TweakBillingSourceOwner);

    TweakBillingSourceOwner.$inject = ['$log'];

    function TweakBillingSourceOwner($log) {

        /**
         * Constructor, with class name
         * @param address         {object}    $ref: #/definitions/BillingAddress  
         * @param email           {string}    
         * @param name            {string}    
         * @param phone           {string}    
         * @param verifiedAddress {object}    $ref: #/definitions/BillingAddress  
         * @param verifiedEmail   {string}    
         * @param verifiedName    {string}    
         * @param verifiedPhone   {string}    
         * @param id              {number}    format: double  
         */
        function TweakBillingSourceOwner(data) {
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
        var parameters = ['address', 'email', 'name', 'phone', 'verifiedAddress', 'verifiedEmail', 'verifiedName', 'verifiedPhone', 'id'];
        var parametersType = ['object', 'string', 'string', 'string', 'object', 'string', 'string', 'string', 'number'];
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
        TweakBillingSourceOwner.build = function (data) {
            return new TweakBillingSourceOwner(data);
        };

        TweakBillingSourceOwner.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceOwner.build).filter(Boolean);
            }
            return TweakBillingSourceOwner.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceOwner;
    }
})();