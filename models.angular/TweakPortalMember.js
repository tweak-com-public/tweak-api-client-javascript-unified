(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalMember', TweakPortalMember);

    TweakPortalMember.$inject = ['$log'];

    function TweakPortalMember($log) {

        /**
         * Constructor, with class name
         * @param created          {string}    format: date-time  
         * @param modified         {string}    format: date-time  
         * @param id               {number}    format: double  
         * @param portalId         {number}    format: double  
         * @param memberId         {number}    format: double  
         * @param portal           {string}    $ref: #/definitions/Portal  
         * @param member           {string}    $ref: #/definitions/TeamMember  
         * @param requesterDesigns {array}     items: $ref: #/definitions/Design    
         * @param assignedDesigns  {array}     items: $ref: #/definitions/Design    
         * @param commentedDesigns {array}     items: $ref: #/definitions/Design    
         * @param reviewedDesigns  {array}     items: $ref: #/definitions/Design    
         */
        function TweakPortalMember(created, modified, id, portalId, memberId, portal, member, requesterDesigns, assignedDesigns, commentedDesigns, reviewedDesigns) {
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.portalId = portalId;
            this.memberId = memberId;
            this.portal = portal;
            this.member = member;
            this.requesterDesigns = requesterDesigns;
            this.assignedDesigns = assignedDesigns;
            this.commentedDesigns = commentedDesigns;
            this.reviewedDesigns = reviewedDesigns;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['created', 'modified', 'id', 'portalId', 'memberId', 'portal', 'member', 'requesterDesigns', 'assignedDesigns', 'commentedDesigns', 'reviewedDesigns'];
        var parametersType = ['string', 'string', 'number', 'number', 'number', 'string', 'string', 'array', 'array', 'array', 'array'];
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
        TweakPortalMember.build = function (data) {
            return new TweakPortalMember(
                data.created,
                data.modified,
                data.id,
                data.portalId,
                data.memberId,
                data.portal,
                data.member,
                data.requesterDesigns,
                data.assignedDesigns,
                data.commentedDesigns,
                data.reviewedDesigns
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