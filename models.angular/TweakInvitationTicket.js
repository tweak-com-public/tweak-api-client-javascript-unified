(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakInvitationTicket', TweakInvitationTicket);

    TweakInvitationTicket.$inject = ['$log'];

    function TweakInvitationTicket($log) {

        /**
         * Constructor, with class name
         * @param message      {string}                  default:   
         * @param token        {string}                  
         * @param inviteeEmail {string}                  
         * @param targetModel  {string}    [REQUIRED]    enum: Team, Portal, Template, Design
         * @param targetId     {string}    [REQUIRED]    
         * @param targetAttrs  {object}                  default:   
         * @param status       {string}                  default: pending  enum: pending, accepted, rejected
         * @param created      {string}                  format: date-time  
         * @param modified     {string}                  format: date-time  
         * @param id           {number}                  format: double  
         * @param inviteeId    {number}                  format: double  
         * @param inviterId    {number}                  format: double  
         * @param invitee      {object}                  
         * @param inviter      {object}                  
         */
        function TweakInvitationTicket(message, token, inviteeEmail, targetModel, targetId, targetAttrs, status, created, modified, id, inviteeId, inviterId, invitee, inviter) {
            this.message = message;
            this.token = token;
            this.inviteeEmail = inviteeEmail;
            this.targetModel = targetModel;
            this.targetId = targetId;
            this.targetAttrs = targetAttrs;
            this.status = status;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.inviteeId = inviteeId;
            this.inviterId = inviterId;
            this.invitee = invitee;
            this.inviter = inviter;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['message', 'token', 'inviteeEmail', 'targetModel', 'targetId', 'targetAttrs', 'status', 'created', 'modified', 'id', 'inviteeId', 'inviterId', 'invitee', 'inviter'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'string', 'string', 'string', 'number', 'number', 'number', 'object', 'object'];
        var requiredParameters = ['targetModel', 'targetId'];

        /**
         * Private function
         */
        function constructorValidation(model) {
            requiredParameters.forEach(function(requiredParameter) {
                if (model[requiredParameter] === undefined) {
                    throw new Error("Required parameter '" + requiredParameter + "' is missing!");
                }
            });

            for (var i = 0; i < parameters.length; i++) {
                var parameterTypeObject = '[object ' + parametersType[i].charAt(0).toUpperCase() + parametersType[i].substr(1) + ']';
                if (model[parameters[i]] && Object.prototype.toString.call(model[parameters[i]]) !== parameterTypeObject) {
                    throw new Error("Wrong parameter type for '" + parameters[i] + "': should be '" + parametersType[i] + "'!");
                }
            }
        }

        /**
         * Static method, assigned to class
         */
        TweakInvitationTicket.build = function (data) {
            return new TweakInvitationTicket(
                data.message,
                data.token,
                data.inviteeEmail,
                data.targetModel,
                data.targetId,
                data.targetAttrs,
                data.status,
                data.created,
                data.modified,
                data.id,
                data.inviteeId,
                data.inviterId,
                data.invitee,
                data.inviter
            );
        };

        TweakInvitationTicket.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakInvitationTicket.build).filter(Boolean);
            }
            return TweakInvitationTicket.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakInvitationTicket;
    }
})();