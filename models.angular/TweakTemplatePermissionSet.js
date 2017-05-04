(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplatePermissionSet', TweakTemplatePermissionSet);

    TweakTemplatePermissionSet.$inject = ['$log'];

    function TweakTemplatePermissionSet($log) {

        /**
         * Constructor, with class name
         * @param canEdit       {boolean}   default: false  
         * @param needApproval  {boolean}   default: false  
         * @param canBeOrdered  {boolean}   default: false  
         * @param printPdf      {boolean}   default: false  
         * @param proofPdf      {boolean}   default: false  
         * @param socialSharing {boolean}   default: false  
         * @param id            {string}    
         * @param templateId    {string}    
         * @param template      {string}    $ref: #/definitions/Template  
         */
        function TweakTemplatePermissionSet(canEdit, needApproval, canBeOrdered, printPdf, proofPdf, socialSharing, id, templateId, template) {
            this.canEdit = canEdit;
            this.needApproval = needApproval;
            this.canBeOrdered = canBeOrdered;
            this.printPdf = printPdf;
            this.proofPdf = proofPdf;
            this.socialSharing = socialSharing;
            this.id = id;
            this.templateId = templateId;
            this.template = template;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['canEdit', 'needApproval', 'canBeOrdered', 'printPdf', 'proofPdf', 'socialSharing', 'id', 'templateId', 'template'];
        var parametersType = ['boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'string', 'string'];
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
        TweakTemplatePermissionSet.build = function (data) {
            return new TweakTemplatePermissionSet(
                data.canEdit,
                data.needApproval,
                data.canBeOrdered,
                data.printPdf,
                data.proofPdf,
                data.socialSharing,
                data.id,
                data.templateId,
                data.template
            );
        };

        TweakTemplatePermissionSet.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakTemplatePermissionSet.build).filter(Boolean);
            }
            return TweakTemplatePermissionSet.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakTemplatePermissionSet;
    }
})();