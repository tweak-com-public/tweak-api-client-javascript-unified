(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakImageFolder', TweakImageFolder);

    TweakImageFolder.$inject = ['$log'];

    function TweakImageFolder($log) {

        /**
         * Constructor, with class name
         * @param name     {string}    [REQUIRED]    
         * @param path     {string}                  default: /  
         * @param created  {string}                  format: date-time  
         * @param modified {string}                  format: date-time  
         * @param id       {string}                  
         * @param teamId   {string}                  
         * @param parentId {string}                  
         * @param images   {array}                   items: $ref: #/definitions/Image    
         * @param team     {object}                  $ref: #/definitions/Team  
         * @param portals  {array}                   items: $ref: #/definitions/Portal    
         * @param members  {array}                   items: $ref: #/definitions/TeamMember    
         * @param parent   {object}                  $ref: #/definitions/ImageFolder  
         * @param children {array}                   items: $ref: #/definitions/ImageFolder    
         */
        function TweakImageFolder(name, path, created, modified, id, teamId, parentId, images, team, portals, members, parent, children) {
            this.name = name;
            this.path = path;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.teamId = teamId;
            this.parentId = parentId;
            this.images = images;
            this.team = team;
            this.portals = portals;
            this.members = members;
            this.parent = parent;
            this.children = children;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'path', 'created', 'modified', 'id', 'teamId', 'parentId', 'images', 'team', 'portals', 'members', 'parent', 'children'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object', 'array', 'array', 'object', 'array'];
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
        TweakImageFolder.build = function (data) {
            return new TweakImageFolder(
                data.name,
                data.path,
                data.created,
                data.modified,
                data.id,
                data.teamId,
                data.parentId,
                data.images,
                data.team,
                data.portals,
                data.members,
                data.parent,
                data.children
            );
        };

        TweakImageFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakImageFolder.build).filter(Boolean);
            }
            return TweakImageFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakImageFolder;
    }
})();