(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalMember', TweakPortalMember);

    TweakPortalMember.$inject = ['$log'];

    function TweakPortalMember($log) {

        /**
         * Constructor, with class name
         * @param roles    {array}     [REQUIRED]    default: items: type: string    
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {number}                  format: double  
         * @param portalId {number}                  format: double  
         * @param memberId {number}                  format: double  
         * @param portal   {string}                  $ref: #/definitions/Portal  
         * @param member   {string}                  $ref: #/definitions/TeamMember  
         */
        function TweakPortalMember(roles, created, modified, id, portalId, memberId, portal, member) {
            this.roles = roles;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.portalId = portalId;
            this.memberId = memberId;
            this.portal = portal;
            this.member = member;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['roles', 'created', 'modified', 'id', 'portalId', 'memberId', 'portal', 'member'];
        var parametersType = ['array', 'string', 'string', 'number', 'number', 'number', 'string', 'string'];
        var requiredParameters = ['roles'];

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
        TweakPortalMember.build = function (data) {
            return new TweakPortalMember(
                data.roles,
                data.created,
                data.modified,
                data.id,
                data.portalId,
                data.memberId,
                data.portal,
                data.member
            );
        };

        TweakPortalMember.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalMember.build).filter(Boolean);
            }
            return TweakPortalMember.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalMember;
    }
})();