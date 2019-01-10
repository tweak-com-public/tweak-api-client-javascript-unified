(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalTemplateFolder', TweakPortalTemplateFolder);

    TweakPortalTemplateFolder.$inject = ['$log'];

    function TweakPortalTemplateFolder($log) {

        /**
         * Constructor, with class name
         * @param name      {string}    [REQUIRED]    
         * @param path      {string}                  default: /  
         * @param created   {string}                  format: date-time  
         * @param modified  {string}                  format: date-time  
         * @param id        {string}                  
         * @param portalId  {string}                  
         * @param parentId  {string}                  
         * @param portal    {object}                  $ref: #/definitions/Portal  
         * @param children  {array}                   items: $ref: #/definitions/PortalTemplateFolder    
         * @param parent    {object}                  $ref: #/definitions/PortalTemplateFolder  
         * @param templates {array}                   items: $ref: #/definitions/Template    
         */
        function TweakPortalTemplateFolder(data) {
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
        var parameters = ['name', 'path', 'created', 'modified', 'id', 'portalId', 'parentId', 'portal', 'children', 'parent', 'templates'];
        var parametersType = ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'object', 'array', 'object', 'array'];
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
        TweakPortalTemplateFolder.build = function (data) {
            return new TweakPortalTemplateFolder(data);
        };

        TweakPortalTemplateFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalTemplateFolder.build).filter(Boolean);
            }
            return TweakPortalTemplateFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalTemplateFolder;
    }
})();