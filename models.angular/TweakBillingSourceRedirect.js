(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakBillingSourceRedirect', TweakBillingSourceRedirect);

    TweakBillingSourceRedirect.$inject = ['$log'];

    function TweakBillingSourceRedirect($log) {

        /**
         * Constructor, with class name
         * @param returnUrl {string}    
         * @param status    {string}    
         * @param url       {string}    
         * @param id        {string}    
         */
        function TweakBillingSourceRedirect(data) {
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
        var parameters = ['returnUrl', 'status', 'url', 'id'];
        var parametersType = ['string', 'string', 'string', 'string'];
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
        TweakBillingSourceRedirect.build = function (data) {
            return new TweakBillingSourceRedirect(data);
        };

        TweakBillingSourceRedirect.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakBillingSourceRedirect.build).filter(Boolean);
            }
            return TweakBillingSourceRedirect.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakBillingSourceRedirect;
    }
})();