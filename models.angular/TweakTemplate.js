(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplate', TweakTemplate);

    TweakTemplate.$inject = ['$log'];

    function TweakTemplate($log) {

        /**
         * Constructor, with class name
         * @param previewId             {string}                  
         * @param name                  {string}    [REQUIRED]    
         * @param thumbnail             {any}                     $ref: #/definitions/x-any  
         * @param object                {object}                  
         * @param description           {string}                  default:   
         * @param edited                {string}                  format: date-time  
         * @param path                  {string}                  default: /  
         * @param status                {string}                  enum: pendingApproval, approved, rejected
         * @param isDynamic             {boolean}                 default: false  
         * @param shared                {string}                  format: date-time  
         * @param permissionSetUpdated  {string}                  format: date-time  
         * @param pagesPreviews         {array}                   items: $ref: #/definitions/CloudinaryImage    
         * @param isTweakTemplate       {boolean}                 
         * @param legacyPluginProductId {string}                  
         * @param created               {string}                  format: date-time  
         * @param modified              {string}                  format: date-time  
         * @param flipBookId            {string}                  
         * @param slideShowId           {string}                  
         * @param id                    {string}                  
         * @param teamId                {string}                  
         * @param uploaderId            {string}                  
         * @param teamFolderId          {string}                  
         * @param workflowId            {string}                  
         * @param versions              {array}                   items: $ref: #/definitions/DesignVersion    
         * @param portals               {array}                   items: $ref: #/definitions/Portal    
         * @param team                  {object}                  $ref: #/definitions/Team  
         * @param members               {array}                   items: $ref: #/definitions/TeamMember    
         * @param templateMembers       {array}                   items: $ref: #/definitions/TemplateMember    
         * @param permission            {object}                  $ref: #/definitions/TemplatePermissionSet  
         * @param designs               {array}                   items: $ref: #/definitions/Design    
         * @param tags                  {array}                   items: $ref: #/definitions/Tag    
         * @param teamFolder            {object}                  $ref: #/definitions/TeamTemplateFolder  
         * @param portalFolders         {array}                   items: $ref: #/definitions/PortalTemplateFolder    
         * @param workflow              {object}                  $ref: #/definitions/Workflow  
         * @param uploader              {object}                  $ref: #/definitions/TeamMember  
         */
        function TweakTemplate(data) {
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
        var parameters = ['previewId', 'name', 'thumbnail', 'object', 'description', 'edited', 'path', 'status', 'isDynamic', 'shared', 'permissionSetUpdated', 'pagesPreviews', 'isTweakTemplate', 'legacyPluginProductId', 'created', 'modified', 'flipBookId', 'slideShowId', 'id', 'teamId', 'uploaderId', 'teamFolderId', 'workflowId', 'versions', 'portals', 'team', 'members', 'templateMembers', 'permission', 'designs', 'tags', 'teamFolder', 'portalFolders', 'workflow', 'uploader'];
        var parametersType = ['string', 'string', 'any', 'object', 'string', 'string', 'string', 'string', 'boolean', 'string', 'string', 'array', 'boolean', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'array', 'array', 'object', 'array', 'array', 'object', 'array', 'array', 'object', 'array', 'object', 'object'];
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
                if (parametersType[i].match(/^any$/i)) {
                    continue;
                }
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