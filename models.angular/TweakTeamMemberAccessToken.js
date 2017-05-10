(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMemberAccessToken', TweakTeamMemberAccessToken);

    TweakTeamMemberAccessToken.$inject = ['$log'];

    function TweakTeamMemberAccessToken($log) {

        /**
         * Constructor, with class name
         * @param id             {string}    [REQUIRED]    
         * @param ttl            {number}                  default: 1209600  description: time to live in seconds (2 weeks by default)  format: double  
         * @param created        {string}                  format: date-time  
         * @param userId         {string}                  
         * @param teamId         {string}                  
         * @param teamMemberId   {string}                  
         * @param portalId       {string}                  
         * @param portalMemberId {string}                  
         * @param customer       {object}                  $ref: #/definitions/Customer  
         * @param team           {object}                  $ref: #/definitions/Team  
         * @param teamMember     {object}                  $ref: #/definitions/TeamMember  
         * @param portal         {object}                  $ref: #/definitions/Portal  
         * @param portalMember   {object}                  $ref: #/definitions/PortalMember  
         */
        function TweakTeamMemberAccessToken(id, ttl, created, userId, teamId, teamMemberId, portalId, portalMemberId, customer, team, teamMember, portal, portalMember) {
            this.id = id;
            this.ttl = ttl;
            this.created = created;
            this.userId = userId;
            this.teamId = teamId;
            this.teamMemberId = teamMemberId;
            this.portalId = portalId;
            this.portalMemberId = portalMemberId;
            this.customer = customer;
            this.team = team;
            this.teamMember = teamMember;
            this.portal = portal;
            this.portalMember = portalMember;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'ttl', 'created', 'userId', 'teamId', 'teamMemberId', 'portalId', 'portalMemberId', 'customer', 'team', 'teamMember', 'portal', 'portalMember'];
        var parametersType = ['string', 'number', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object', 'object'];
        var requiredParameters = ['id'];

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
        TweakTeamMemberAccessToken.build = function (data) {
            return new TweakTeamMemberAccessToken(
                data.id,
                data.ttl,
                data.created,
                data.userId,
                data.teamId,
                data.teamMemberId,
                data.portalId,
                data.portalMemberId,
                data.customer,
                data.team,
                data.teamMember,
                data.portal,
                data.portalMember
            );
        };

        TweakTeamMemberAccessToken.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTeamMemberAccessToken.build).filter(Boolean);
            }
            return TweakTeamMemberAccessToken.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTeamMemberAccessToken;
    }
})();