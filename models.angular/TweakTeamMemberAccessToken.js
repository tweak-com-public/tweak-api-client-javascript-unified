(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTeamMemberAccessToken', TweakTeamMemberAccessToken);

    TweakTeamMemberAccessToken.$inject = ['$log'];

    function TweakTeamMemberAccessToken($log) {

        /**
         * Constructor, with class name
         * @param roles          {array}                   items: type: string    
         * @param refreshToken   {string}                  
         * @param id             {string}    [REQUIRED]    
         * @param ttl            {number}                  default: 1209600  description: time to live in seconds (2 weeks by default)  format: double  
         * @param scopes         {array}                   description: Array of scopes granted to this access token.  items: type: string    
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
        function TweakTeamMemberAccessToken(data) {
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
        var parameters = ['roles', 'refreshToken', 'id', 'ttl', 'scopes', 'created', 'userId', 'teamId', 'teamMemberId', 'portalId', 'portalMemberId', 'customer', 'team', 'teamMember', 'portal', 'portalMember'];
        var parametersType = ['array', 'string', 'string', 'number', 'array', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object', 'object', 'object'];
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
            return new TweakTeamMemberAccessToken(data);
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