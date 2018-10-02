(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakNotification', TweakNotification);

    TweakNotification.$inject = ['$log'];

    function TweakNotification($log) {

        /**
         * Constructor, with class name
         * @param type     {string}    [REQUIRED]    enum: team.billing.subscription.trial_will_end, team.billing.subscription.updated_plan, team.billing.subscription.updated_additional, team.billing.subscription.deleted, team.billing.invoice.created, team.billing.invoice.upcoming, team.billing.invoice.payment_succeeded, team.billing.invoice.payment_failed
         * @param title    {string}    [REQUIRED]    
         * @param body     {string}                  
         * @param read     {boolean}                 default: false  
         * @param buttons  {array}                   default: items: $ref: #/definitions/NotificationButton    
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param teamId   {string}                  
         * @param portalId {string}                  
         * @param memberId {string}                  
         * @param team     {object}                  $ref: #/definitions/Team  
         * @param portal   {object}                  $ref: #/definitions/Portal  
         * @param member   {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakNotification(data) {
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
        var parameters = ['type', 'title', 'body', 'read', 'buttons', 'created', 'modified', 'id', 'teamId', 'portalId', 'memberId', 'team', 'portal', 'member'];
        var parametersType = ['string', 'string', 'string', 'boolean', 'array', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object'];
        var requiredParameters = ['type', 'title'];

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
        TweakNotification.build = function (data) {
            return new TweakNotification(data);
        };

        TweakNotification.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakNotification.build).filter(Boolean);
            }
            return TweakNotification.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakNotification;
    }
})();