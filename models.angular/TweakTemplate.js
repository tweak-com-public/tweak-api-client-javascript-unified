(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplate', TweakTemplate);

    TweakTemplate.$inject = ['$log'];

    function TweakTemplate($log) {

        /**
         * Constructor, with class name
         * @param name            {string}    [REQUIRED]    
         * @param thumbnail       {string}                  
         * @param object          {object}    [REQUIRED]    
         * @param description     {string}                  default:   
         * @param edited          {string}                  format: date-time  
         * @param teamPath        {string}                  default: /  
         * @param status          {string}                  default: pendingApproval  enum: pendingApproval, approved, rejected
         * @param created         {string}                  format: date-time  
         * @param modified        {string}                  format: date-time  
         * @param id              {string}                  
         * @param teamId          {string}                  
         * @param uploaderId      {string}                  
         * @param teamFolderId    {string}                  
         * @param workflowId      {string}                  
         * @param portals         {array}                   items: $ref: #/definitions/Portal    
         * @param team            {object}                  $ref: #/definitions/Team  
         * @param members         {array}                   items: $ref: #/definitions/TeamMember    
         * @param templateMembers {array}                   items: $ref: #/definitions/TemplateMember    
         * @param permission      {object}                  $ref: #/definitions/TemplatePermissionSet  
         * @param designs         {array}                   items: $ref: #/definitions/Design    
         * @param tags            {array}                   items: $ref: #/definitions/Tag    
         * @param teamFolder      {object}                  $ref: #/definitions/TeamTemplateFolder  
         * @param portalFolders   {array}                   items: $ref: #/definitions/PortalTemplateFolder    
         * @param workflow        {object}                  $ref: #/definitions/Workflow  
         * @param uploader        {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakTemplate(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['name', 'thumbnail', 'object', 'description', 'edited', 'teamPath', 'status', 'created', 'modified', 'id', 'teamId', 'uploaderId', 'teamFolderId', 'workflowId', 'portals', 'team', 'members', 'templateMembers', 'permission', 'designs', 'tags', 'teamFolder', 'portalFolders', 'workflow', 'uploader'];
        var parametersType = ['string', 'string', 'object', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'object', 'array', 'array', 'object', 'array', 'array', 'object', 'array', 'object', 'object'];
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
            return new TweakTemplate(data);
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