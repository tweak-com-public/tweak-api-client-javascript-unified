(function () {
    'use strict';
    angular.module('Tweak')
        .factory('TweakAssetCollectionPortal', TweakAssetCollectionPortal);

    TweakAssetCollectionPortal.$inject = ['$log'];

    function TweakAssetCollectionPortal($log) {

        /**
         * Constructor, with class name
         * @param message               {string}    
         * @param requireToLogin        {boolean}   default: false  
         * @param downloadLowResolution {boolean}   default: false  
         * @param hasDownloadPermission {boolean}   default: false  
         * @param hasEditPermission     {boolean}   default: false  
         * @param hasViewPermission     {boolean}   default: false  
         * @param created               {string}    format: date-time  
         * @param modified              {string}    format: date-time  
         * @param id                    {string}    
         * @param collectionId          {string}    
         * @param portalId              {string}    
         * @param assetCollection       {object}    $ref: #/definitions/AssetCollection  
         * @param portal                {object}    $ref: #/definitions/Portal  
         */
        function TweakAssetCollectionPortal(data) {
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
        var parameters = ['message', 'requireToLogin', 'downloadLowResolution', 'hasDownloadPermission', 'hasEditPermission', 'hasViewPermission', 'created', 'modified', 'id', 'collectionId', 'portalId', 'assetCollection', 'portal'];
        var parametersType = ['string', 'boolean', 'boolean', 'boolean', 'boolean', 'boolean', 'string', 'string', 'string', 'string', 'string', 'object', 'object'];
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
        TweakAssetCollectionPortal.build = function (data) {
            return new TweakAssetCollectionPortal(data);
        };

        TweakAssetCollectionPortal.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData.map(TweakAssetCollectionPortal.build).filter(Boolean);
            }
            return TweakAssetCollectionPortal.build(responseData);
        };

        /**
         * Return the constructor function
         */
        return TweakAssetCollectionPortal;
    }
})();