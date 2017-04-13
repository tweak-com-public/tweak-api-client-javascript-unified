(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMemberAccessToken', TweakTeamMemberAccessToken);

    TweakTeamMemberAccessToken.$inject = ['$log'];

    function TweakTeamMemberAccessToken($log) {

        /**
         * Constructor, with class name
         * @param id           {string}    [REQUIRED]    
         * @param ttl          {number}                  default: 1209600  description: time to live in seconds (2 weeks by default)  format: double  
         * @param created      {string}                  format: date-time  
         * @param userId       {number}                  format: double  
         * @param teamId       {string}                  
         * @param teamMemberId {number}                  format: double  
         * @param customer     {object}                  
         * @param team         {object}                  
         * @param teamMember   {object}                  
         */
        function TweakTeamMemberAccessToken(id, ttl, created, userId, teamId, teamMemberId, customer, team, teamMember) {
            this.id = id;
            this.ttl = ttl;
            this.created = created;
            this.userId = userId;
            this.teamId = teamId;
            this.teamMemberId = teamMemberId;
            this.customer = customer;
            this.team = team;
            this.teamMember = teamMember;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'ttl', 'created', 'userId', 'teamId', 'teamMemberId', 'customer', 'team', 'teamMember'];
        var parametersType = ['string', 'number', 'string', 'number', 'string', 'number', 'object', 'object', 'object'];
        var requiredParameters = ['id'];

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
        TweakTeamMemberAccessToken.build = function (data) {
            return new TweakTeamMemberAccessToken(
                data.id,
                data.ttl,
                data.created,
                data.userId,
                data.teamId,
                data.teamMemberId,
                data.customer,
                data.team,
                data.teamMember
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