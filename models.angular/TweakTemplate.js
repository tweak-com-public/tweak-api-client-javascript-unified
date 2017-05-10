(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplate', TweakTemplate);

    TweakTemplate.$inject = ['$log'];

    function TweakTemplate($log) {

        /**
         * Constructor, with class name
         * @param name          {string}    [REQUIRED]    
         * @param thumbnail     {string}                  
         * @param object        {object}    [REQUIRED]    
         * @param description   {string}                  default:   
         * @param edited        {string}                  format: date-time  
         * @param created       {string}                  format: date-time  
         * @param modified      {string}                  format: date-time  
         * @param id            {string}                  
         * @param teamId        {string}                  
         * @param memberId      {string}                  
         * @param teamFolderId  {string}                  
         * @param workflowId    {string}                  
         * @param portals       {array}                   items: $ref: #/definitions/Portal    
         * @param team          {object}                  $ref: #/definitions/Team  
         * @param members       {array}                   items: $ref: #/definitions/TeamMember    
         * @param permission    {object}                  $ref: #/definitions/TemplatePermissionSet  
         * @param designs       {array}                   items: $ref: #/definitions/Design    
         * @param tags          {array}                   items: $ref: #/definitions/Tag    
         * @param teamFolder    {object}                  $ref: #/definitions/TeamTemplateFolder  
         * @param portalFolders {array}                   items: $ref: #/definitions/PortalTemplateFolder    
         * @param workflow      {object}                  $ref: #/definitions/Workflow  
         */
        function TweakTemplate(name, thumbnail, object, description, edited, created, modified, id, teamId, memberId, teamFolderId, workflowId, portals, team, members, permission, designs, tags, teamFolder, portalFolders, workflow) {
            this.name = name;
            this.thumbnail = thumbnail;
            this.object = object;
            this.description = description;
            this.edited = edited;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.teamId = teamId;
            this.memberId = memberId;
            this.teamFolderId = teamFolderId;
            this.workflowId = workflowId;
            this.portals = portals;
            this.team = team;
            this.members = members;
            this.permission = permission;
            this.designs = designs;
            this.tags = tags;
            this.teamFolder = teamFolder;
            this.portalFolders = portalFolders;
            this.workflow = workflow;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'thumbnail', 'object', 'description', 'edited', 'created', 'modified', 'id', 'teamId', 'memberId', 'teamFolderId', 'workflowId', 'portals', 'team', 'members', 'permission', 'designs', 'tags', 'teamFolder', 'portalFolders', 'workflow'];
        var parametersType = ['string', 'string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object', 'array', 'object', 'array', 'array', 'object', 'array', 'object'];
        var requiredParameters = ['name', 'object'];

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
        TweakTemplate.build = function (data) {
            return new TweakTemplate(
                data.name,
                data.thumbnail,
                data.object,
                data.description,
                data.edited,
                data.created,
                data.modified,
                data.id,
                data.teamId,
                data.memberId,
                data.teamFolderId,
                data.workflowId,
                data.portals,
                data.team,
                data.members,
                data.permission,
                data.designs,
                data.tags,
                data.teamFolder,
                data.portalFolders,
                data.workflow
            );
        };

        TweakTemplate.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplate.build).filter(Boolean);
            }
            return TweakTemplate.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplate;
    }
})();