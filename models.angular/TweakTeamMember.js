(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMember', TweakTeamMember);

    TweakTeamMember.$inject = ['$log'];

    function TweakTeamMember($log) {

        /**
         * Constructor, with class name
         * @param created           {string}    format: date-time  
         * @param modified          {string}    format: date-time  
         * @param id                {number}    format: double  
         * @param customerId        {number}    format: double  
         * @param teamId            {string}    
         * @param customer          {string}    $ref: #/definitions/Customer  
         * @param team              {string}    $ref: #/definitions/Team  
         * @param portals           {array}     items: $ref: #/definitions/Portal    
         * @param uploadedTemplates {array}     items: $ref: #/definitions/Template    
         * @param templates         {array}     items: $ref: #/definitions/Template    
         * @param invitationTickets {array}     items: $ref: #/definitions/InvitationTicket    
         */
        function TweakTeamMember(created, modified, id, customerId, teamId, customer, team, portals, uploadedTemplates, templates, invitationTickets) {
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.customerId = customerId;
            this.teamId = teamId;
            this.customer = customer;
            this.team = team;
            this.portals = portals;
            this.uploadedTemplates = uploadedTemplates;
            this.templates = templates;
            this.invitationTickets = invitationTickets;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['created', 'modified', 'id', 'customerId', 'teamId', 'customer', 'team', 'portals', 'uploadedTemplates', 'templates', 'invitationTickets'];
        var parametersType = ['string', 'string', 'number', 'number', 'string', 'string', 'string', 'array', 'array', 'array', 'array'];
        var requiredParameters = [];

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
        TweakTeamMember.build = function (data) {
            return new TweakTeamMember(
                data.created,
                data.modified,
                data.id,
                data.customerId,
                data.teamId,
                data.customer,
                data.team,
                data.portals,
                data.uploadedTemplates,
                data.templates,
                data.invitationTickets
            );
        };

        TweakTeamMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamMember.build).filter(Boolean);
            }
            return TweakTeamMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamMember;
    }
})();