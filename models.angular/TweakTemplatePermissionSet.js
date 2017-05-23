(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakTemplatePermissionSet', TweakTemplatePermissionSet);

    TweakTemplatePermissionSet.$inject = ['$log'];

    function TweakTemplatePermissionSet($log) {

        /**
         * Constructor, with class name
         * @param highResPdf        {boolean}   default: false  
         * @param proofPdf          {boolean}   default: false  
         * @param jpegs             {boolean}   default: false  
         * @param socialSharing     {boolean}   default: false  
         * @param canEdit           {boolean}   default: false  
         * @param needAdminApproval {boolean}   default: false  
         * @param id                {string}    
         * @param templateId        {string}    
         * @param template          {object}    $ref: #/definitions/Template  
         */
        function TweakTemplatePermissionSet(data) {
            data = data || {};

            for (var d in data) {
                this[d] = data[d];
            }

            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['highResPdf', 'proofPdf', 'jpegs', 'socialSharing', 'canEdit', 'needAdminApproval', 'id', 'templateId', 'template'];
        var parametersType = ['boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'string', 'object'];
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
            return new TweakTemplatePermissionSet(data);
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