(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakDesignFolder', TweakDesignFolder);

    TweakDesignFolder.$inject = ['$log'];

    function TweakDesignFolder($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param id       {string}                  
         * @param memberId {string}                  
         * @param parentId {string}                  
         * @param portalId {string}                  
         * @param member   {string}                  $ref: #/definitions/TeamMember  
         * @param children {array}                   items: $ref: #/definitions/DesignFolder    
         * @param parent   {string}                  $ref: #/definitions/DesignFolder  
         * @param designs  {array}                   items: $ref: #/definitions/Design    
         * @param portal   {string}                  $ref: #/definitions/Portal  
         */
        function TweakDesignFolder(name, id, memberId, parentId, portalId, member, children, parent, designs, portal) {
            this.name = name;
            this.id = id;
            this.memberId = memberId;
            this.parentId = parentId;
            this.portalId = portalId;
            this.member = member;
            this.children = children;
            this.parent = parent;
            this.designs = designs;
            this.portal = portal;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'id', 'memberId', 'parentId', 'portalId', 'member', 'children', 'parent', 'designs', 'portal'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'array', 'string', 'array', 'string'];
        var requiredParameters = ['name'];

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
        TweakDesignFolder.build = function (data) {
            return new TweakDesignFolder(
                data.name,
                data.id,
                data.memberId,
                data.parentId,
                data.portalId,
                data.member,
                data.children,
                data.parent,
                data.designs,
                data.portal
            );
        };

        TweakDesignFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakDesignFolder.build).filter(Boolean);
            }
            return TweakDesignFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakDesignFolder;
    }
})();