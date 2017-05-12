(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalTemplate', TweakPortalTemplate);

    TweakPortalTemplate.$inject = ['$log'];

    function TweakPortalTemplate($log) {

        /**
         * Constructor, with class name
         * @param path       {string}    default: /  
         * @param created    {string}    format: date-time  
         * @param modified   {string}    format: date-time  
         * @param id         {string}    
         * @param portalId   {string}    
         * @param templateId {string}    
         * @param folderId   {string}    
         * @param portal     {object}    $ref: #/definitions/Portal  
         * @param template   {object}    $ref: #/definitions/Template  
         * @param folder     {object}    $ref: #/definitions/PortalTemplateFolder  
         */
        function TweakPortalTemplate(path, created, modified, id, portalId, templateId, folderId, portal, template, folder) {
            this.path = path;
            this.created = created;
            this.modified = modified;
            this.id = id;
            this.portalId = portalId;
            this.templateId = templateId;
            this.folderId = folderId;
            this.portal = portal;
            this.template = template;
            this.folder = folder;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['path', 'created', 'modified', 'id', 'portalId', 'templateId', 'folderId', 'portal', 'template', 'folder'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'object', 'object'];
        var requiredParameters = [];

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
        TweakPortalTemplate.build = function (data) {
            return new TweakPortalTemplate(
                data.path,
                data.created,
                data.modified,
                data.id,
                data.portalId,
                data.templateId,
                data.folderId,
                data.portal,
                data.template,
                data.folder
            );
        };

        TweakPortalTemplate.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalTemplate.build).filter(Boolean);
            }
            return TweakPortalTemplate.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalTemplate;
    }
})();