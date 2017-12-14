(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakInvitationTicket', TweakInvitationTicket);

    TweakInvitationTicket.$inject = ['$log'];

    function TweakInvitationTicket($log) {

        /**
         * Constructor, with class name
         * @param message                   {string}                  default:   
         * @param token                     {string}                  
         * @param inviteeEmail              {string}                  
         * @param targetModel               {string}    [REQUIRED]    enum: Team, Portal, Template, ImageFolder, Design
         * @param targetId                  {string}    [REQUIRED]    
         * @param targetAttrs               {object}                  default:   
         * @param status                    {string}                  enum: pending, accepted
         * @param notify                    {boolean}                 default: true  
         * @param created                   {string}                  format: date-time  
         * @param modified                  {string}                  format: date-time  
         * @param id                        {string}                  
         * @param inviteeId                 {string}                  
         * @param inviterId                 {string}                  
         * @param targetTeamId              {string}                  
         * @param targetTeamMemberId        {string}                  
         * @param targetPortalId            {string}                  
         * @param targetPortalMemberId      {string}                  
         * @param targetTemplateId          {string}                  
         * @param targetDesignId            {string}                  
         * @param targetTemplateMemberId    {string}                  
         * @param targetDesignMemberId      {string}                  
         * @param targetImageFolderId       {string}                  
         * @param targetImageFolderMemberId {string}                  
         * @param invitee                   {object}                  $ref: #/definitions/Customer  
         * @param inviter                   {object}                  $ref: #/definitions/TeamMember  
         * @param targetTeam                {object}                  $ref: #/definitions/Team  
         * @param targetTeamMember          {object}                  $ref: #/definitions/TeamMember  
         * @param targetPortal              {object}                  $ref: #/definitions/Portal  
         * @param targetPortalMember        {object}                  $ref: #/definitions/PortalMember  
         * @param targetTemplate            {object}                  $ref: #/definitions/Template  
         * @param targetTemplateMember      {object}                  $ref: #/definitions/TemplateMember  
         * @param targetImageFolder         {object}                  $ref: #/definitions/ImageFolder  
         * @param targetImageFolderMember   {object}                  $ref: #/definitions/ImageFolderMember  
         * @param targetDesign              {object}                  $ref: #/definitions/Design  
         * @param targetDesignMember        {object}                  $ref: #/definitions/DesignMember  
         */
        function TweakInvitationTicket(data) {
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
        var parameters = ['message', 'token', 'inviteeEmail', 'targetModel', 'targetId', 'targetAttrs', 'status', 'notify', 'created', 'modified', 'id', 'inviteeId', 'inviterId', 'targetTeamId', 'targetTeamMemberId', 'targetPortalId', 'targetPortalMemberId', 'targetTemplateId', 'targetDesignId', 'targetTemplateMemberId', 'targetDesignMemberId', 'targetImageFolderId', 'targetImageFolderMemberId', 'invitee', 'inviter', 'targetTeam', 'targetTeamMember', 'targetPortal', 'targetPortalMember', 'targetTemplate', 'targetTemplateMember', 'targetImageFolder', 'targetImageFolderMember', 'targetDesign', 'targetDesignMember'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'object', 'string', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object', 'object'];
        var requiredParameters = ['targetModel', 'targetId'];

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
        TweakInvitationTicket.build = function (data) {
            return new TweakInvitationTicket(data);
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