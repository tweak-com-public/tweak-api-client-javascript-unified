(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakNotificationButton', TweakNotificationButton);

    TweakNotificationButton.$inject = ['$log'];

    function TweakNotificationButton($log) {

        /**
         * Constructor, with class name
         * @param type   {string}                  enum: default, info, success, warning, danger
         * @param label  {string}    [REQUIRED]    
         * @param action {string}    [REQUIRED]    enum: notification.markAs.read, team.billing.details, team.billing.upgrade, team.billing.invoice.details, team.billing.card
         * @param id     {string}                  
         */
        function TweakNotificationButton(data) {
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
        var parameters = ['type', 'label', 'action', 'id'];
        var parametersType = ['string', 'string', 'string', 'string'];
        var requiredParameters = ['label', 'action'];

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
        TweakNotificationButton.build = function (data) {
            return new TweakNotificationButton(data);
        };

        TweakNotificationButton.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakNotificationButton.build).filter(Boolean);
            }
            return TweakNotificationButton.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakNotificationButton;
    }
})();