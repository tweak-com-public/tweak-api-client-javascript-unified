(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakPortalImageFolder', TweakPortalImageFolder);

    TweakPortalImageFolder.$inject = ['$log'];

    function TweakPortalImageFolder($log) {

        /**
         * Constructor, with class name
         * @param id       {string}    
         * @param portalId {string}    
         * @param folderId {string}    
         * @param portal   {object}    $ref: #/definitions/Portal  
         * @param folder   {object}    $ref: #/definitions/ImageFolder  
         */
        function TweakPortalImageFolder(id, portalId, folderId, portal, folder) {
            this.id = id;
            this.portalId = portalId;
            this.folderId = folderId;
            this.portal = portal;
            this.folder = folder;
            constructorValidation(this);
        }

        /**
         * Private properties
         */
        var parameters = ['id', 'portalId', 'folderId', 'portal', 'folder'];
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
        TweakPortalImageFolder.build = function (data) {
            return new TweakPortalImageFolder(
                data.id,
                data.portalId,
                data.folderId,
                data.portal,
                data.folder
            );
        };

        TweakPortalImageFolder.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakPortalImageFolder.build).filter(Boolean);
            }
            return TweakPortalImageFolder.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakPortalImageFolder;
    }
})();