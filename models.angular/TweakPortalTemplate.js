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
        function TweakPortalTemplate(data) {
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
        TweakPortalTemplate.build = function (data) {
            return new TweakPortalTemplate(data);
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