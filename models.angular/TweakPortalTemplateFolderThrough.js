(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalTemplateFolderThrough', TweakPortalTemplateFolderThrough);

    TweakPortalTemplateFolderThrough.$inject = ['$log'];

    function TweakPortalTemplateFolderThrough($log) {

        /**
         * Constructor, with class name
         * @param id             {string}    
         * @param portalFolderId {string}    
         * @param templateId     {string}    
         * @param portalFolder   {object}    $ref: #/definitions/PortalTemplateFolder  
         * @param template       {object}    $ref: #/definitions/Template  
         */
        function TweakPortalTemplateFolderThrough(id, portalFolderId, templateId, portalFolder, template) {
            this.id = id;
            this.portalFolderId = portalFolderId;
            this.templateId = templateId;
            this.portalFolder = portalFolder;
            this.template = template;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'portalFolderId', 'templateId', 'portalFolder', 'template'];
        var parametersType = ['string', 'string', 'string', 'object', 'object'];
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
        TweakPortalTemplateFolderThrough.build = function (data) {
            return new TweakPortalTemplateFolderThrough(
                data.id,
                data.portalFolderId,
                data.templateId,
                data.portalFolder,
                data.template
            );
        };

        TweakPortalTemplateFolderThrough.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalTemplateFolderThrough.build).filter(Boolean);
            }
            return TweakPortalTemplateFolderThrough.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalTemplateFolderThrough;
    }
})();